//========================================================================
//$Id: SystemPropertyLogManager.java 104 2006-07-04 13:53:29Z gregw $
//Copyright 2006 WebTide LLC
//------------------------------------------------------------------------
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//http://www.apache.org/licenses/LICENSE-2.0
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//========================================================================

package org.mortbay.hightide.log;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.logging.Filter;
import java.util.logging.Formatter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;



/**
 * SystemPropertyLogManager
 * 
 * Extends the jdk LogManager class to allow for
 * the expansion of System properties in the
 * logging.properties file.
 *
 */
public class SystemPropertyLogManager extends LogManager
{
    private static final int START_TOKEN_STATE = 0;
    private static final int IN_TOKEN_STATE = 1;
    private HashMap loggers = new HashMap();
    private LogNode root;
    private RootLogger rootLogger;
    private HashMap handlers = new HashMap();
    private Properties props;
    
    public void readConfiguration(InputStream inputStream) 
    throws IOException, SecurityException
    {
        props = new Properties();
        props.load(inputStream);
        Enumeration keys = props.keys();
        while (keys.hasMoreElements())
        {
            String key = (String) keys.nextElement();
            String val = props.getProperty(key);
            props.setProperty(key, parseProperty(val));
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        props.store(out, null);
        inputStream = new ByteArrayInputStream(out.toByteArray());
        readConfigurationProperties(props);
    }

    public String parseProperty(String val)
    {
        if (!val.contains("${")) return val;

        char[] charVal = val.toCharArray();
        StringBuffer sBuff = new StringBuffer();

        for (int i = 0; i < charVal.length; i++)
        {
            if (i + 2 <= charVal.length && charVal[i] == '$'
                    && charVal[i + 1] == '{')
            {
                i = i + 1;
                continue;
            }
            else if (i > 1 && charVal[i - 1] == '{' && charVal[i - 2] == '$')
            {
                StringBuffer sysProp = new StringBuffer();
                for (int j = i; j < charVal.length; j++)
                {
                    if (charVal[j] == '}')
                    {
                        i = j;
                        break;
                    }
                    else
                        sysProp.append(charVal[j]);
                }
                if (sysProp.length() > 0)
                    sBuff.append(System.getProperty(sysProp.toString()));
            }
            else
            {
                sBuff.append(charVal[i]);
            }
        }

        return sBuff.toString();
    }
    
    
    public synchronized Logger getLogger(String name)
    {
        Logger l = (Logger)loggers.get(name);
        return l;
    }
    
    
    public synchronized Enumeration getLoggerNames() 
    {     
        Vector v = new Vector();
        v.addAll(loggers.keySet());
        return v.elements();
    }

    
    /**
     * Add a logger
     * @see java.util.logging.LogManager#addLogger(java.util.logging.Logger)
     */
    public synchronized boolean addLogger(final Logger logger)
    {
        if (logger.getName().equals(""))
        {
            //only allow our own root implementation in
            if (! (logger instanceof RootLogger))
            {
                return true;
            }
                
        }

        final String loggerName = logger.getName();

        if (loggers.containsKey(loggerName)) 
            return false; 
        
        loggers.put(loggerName, logger);
        
        // Apply initial level for new logger
        final String levelString = getProperty(loggerName + ".level");
        if (levelString != null)
        {
            logger.setLevel(Level.parse(levelString.trim()));
        }

        // If any parent loggers have levels definied, make sure they are
        // instantiated
        int dotIndex = loggerName.lastIndexOf('.');
        while (dotIndex >= 0)
        {
            final String parentName = loggerName.substring(0, dotIndex);
            if (getProperty(parentName + ".level") != null)
            {
                Logger.getLogger(parentName);
                break;
            }
            dotIndex = loggerName.lastIndexOf('.', dotIndex - 1);
        }

        // Find associated node
        LogNode node = findNode(loggerName);
        node.logger = logger;
        // Set parent logger
        Logger parentLogger = node.findParentLogger();
               
        if (parentLogger != null)
        {
            logger.setParent(parentLogger);
        }
        

        // Tell children we are their new parent
        node.setParentLogger(logger);

        // Get any logger specific handlers that were defined for this logger
        String loggerHandlerNames = getProperty(loggerName + ".handlers");
        if (loggerHandlerNames != null)
        {
            logger.setUseParentHandlers(false);
            StringTokenizer tok = new StringTokenizer(loggerHandlerNames, ",");
            while (tok.hasMoreTokens())
            {
                String handlerName = (tok.nextToken().trim());
                Handler handler = (Handler) handlers.get(handlerName);
                if (handler != null)
                {
                    logger.addHandler(handler);
                }
            }
        }

        //by default forward all log messages to parents of the logger
        boolean useParentHandlers = getBooleanProperty(loggerName+ ".useParentHandlers", true);
        if (!useParentHandlers)
            logger.setUseParentHandlers(useParentHandlers);
        
        return true;
    }

    
    
    
    public void readConfiguration() 
    throws IOException, SecurityException 
    {
        checkAccess();
        
        // if a configuration class is specified, load it and use it.
        //javadoc on LogManager says:
        //   Instantiate the named class.  It is its contructor's
        //   responsibility to initialize the logging configuration, by
        //   calling readConfiguration(InputStream) with a suitable stream.
        String cname = System.getProperty("java.util.logging.config.class");
        if (cname != null) 
        {
            try 
            {
                Class clz = getClass().getClassLoader().loadClass(cname);
                clz.newInstance();
                return;
            } 
            catch (Exception ex) 
            {
                System.err.println("Logging configuration class \"" + cname + "\" failed");
                System.err.println("" + ex);        
                // keep going and use config file.
            }
        }
        
        String fname = System.getProperty("java.util.logging.config.file");
        if (fname == null) 
        {
            fname = System.getProperty("java.home");
            if (fname == null) 
            {
                throw new Error("Can't find java.home ??");
            }
            File f = new File(fname, "lib");
            f = new File(f, "logging.properties");
            fname = f.getCanonicalPath();
        }
        
        // make a new root logger
        rootLogger = new RootLogger();
        loggers.put("", rootLogger);
        
        //make a new rootNode too
        root = new LogNode (null, rootLogger);
        
        // now read the logging config
        InputStream in = new FileInputStream(fname);
        BufferedInputStream bin = new BufferedInputStream(in);
        try 
        {
            readConfiguration(bin);
        } 
        finally 
        {
            if (in != null) 
            {
                in.close();
            }
        }
    }    
        
    

 

    
    /**
     * Parse the properties for the logging
     * @param props
     * @throws IOException
     * @throws SecurityException
     */
    public void readConfigurationProperties (Properties props) 
    throws IOException, SecurityException {
        checkAccess();
        reset();

        // TODO handle the "config" property
        /*
        String names[] = parsePropertyValue("config");
        }
        */

        
        //ensure that the root logger is set up correctly
        String rootLevel = getProperty(""+".level");
        if (rootLevel != null)
        {
            rootLogger.setLevel(Level.parse(rootLevel.trim()));
        }
        
        //parse all of the global handlers and create objects for them
        String[] handlerNames = parsePropertyValue (props.getProperty("handlers"));
        
        for (int i=0; handlerNames != null && (i < handlerNames.length); i++)
        {
            try
            {
                String handlerName = handlerNames[i];
                Class clazz = getClass().getClassLoader().loadClass(handlerName);
                Handler handler = (Handler)clazz.newInstance();
                String levs = props.getProperty(handlerName + ".level");
                if (levs != null)
                    handler.setLevel(Level.parse(levs));
                handlers.put(handlerName, handler);
                rootLogger.addHandler(handler);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Get the value of a logging property. The method returns null if the
     * property is not found.
     * 
     * @param name property name
     * @return property value
     */
    public String getProperty(String name)
    {
        return props.getProperty(name);
    }


    public String getStringProperty(String name, String defaultValue)
    {
        String val = getProperty(name);
        if (val == null) { return defaultValue; }
        return val.trim();
    }

   
    public int getIntProperty(String name, int defaultValue)
    {
        String val = getProperty(name);
        if (val == null) { return defaultValue; }
        try
        {
            return Integer.parseInt(val.trim());
        }
        catch (Exception ex)
        {
            return defaultValue;
        }
    }

    
    public boolean getBooleanProperty(String name, boolean defaultValue)
    {
        String val = getProperty(name);
        if (val == null) 
        { 
            return defaultValue; 
        }
        val = val.toLowerCase();
        if (val.equals("true") || val.equals("1"))
        {
            return true;
        }
        else if (val.equals("false") || val.equals("0")) { return false; }
        return defaultValue;
    }

    
    public Level getLevelProperty(String name, Level defaultValue)
    {
        String val = getProperty(name);
        if (val == null) 
        { 
            return defaultValue; 
        }
        try
        {
            return Level.parse(val.trim());
        }
        catch (Exception ex)
        {
            return defaultValue;
        }
    }

   
    public Filter getFilterProperty(String name, Filter defaultValue)
    {
        String val = getProperty(name);
        try
        {
            if (val != null)
            {
                Class clz = getClass().getClassLoader().loadClass(val);
                return (Filter) clz.newInstance();
            }
        }
        catch (Exception ex)
        {
            // We got one of a variety of exceptions in creating the
            // class or creating an instance.
            // Drop through.
        }
        // We got an exception.  Return the defaultValue.
        return defaultValue;
    }



    public Formatter getFormatterProperty(String name, Formatter defaultValue)
    {
        String val = getProperty(name);
        try
        {
            if (val != null)
            {
                Class clz = getClass().getClassLoader().loadClass(val);
                return (Formatter) clz.newInstance();
            }
        }
        catch (Exception ex)
        {
            // We got one of a variety of exceptions in creating the
            // class or creating an instance.
            // Drop through.
        }
        // We got an exception.  Return the defaultValue.
        return defaultValue;
    }
        
        
    
    protected String[] parsePropertyValue (String value)
    {
        if ((value == null) | (value.equals("")))
                return new String[0];
           
        ArrayList values = new ArrayList();
        
        String tmp = value.trim();
        
        int startTokenPos = 0;
        int endTokenPos = 0;
        int state = START_TOKEN_STATE;
        Character comma = new Character(',');
        for (int i=0; i<tmp.length(); i++)
        {
            char c = tmp.charAt(i);
            
            switch (state)
            {
                case START_TOKEN_STATE:
                {
                    if (Character.isWhitespace(c))
                        ;//skip leading whitespace
                    else if (comma.equals(new Character(c)))
                        //found an empty token
                        ;
                    else
                    {
                        state = IN_TOKEN_STATE;
                    }
                    
                    
                    break;
                }
                case IN_TOKEN_STATE:
                {
                    if (Character.isWhitespace(c) || comma.equals(new Character(c)))
                    {
                        //found first whitespace character or a , so it is the end of the token
                        
                        
                        endTokenPos = i;
                        String s = tmp.substring(startTokenPos, endTokenPos);
                        values.add(s.trim());
                        startTokenPos = endTokenPos +1;
                        state = START_TOKEN_STATE;
                    }
                    
                    break;
                }
            }
           
        }
        if (state == IN_TOKEN_STATE)
        {
            String s = tmp.substring(startTokenPos);
            values.add(s.trim());
        }
           
        String[] stringValues = new String[values.size()];
        values.toArray(stringValues);
        return stringValues;
    }
        
    
    
    protected LogNode findNode (String name)
    {
        if (name == null || name.equals(""))
            return root;
        
        LogNode node = root;
        while (name.length() > 0) 
        {
            int i = name.indexOf(".");
            String head;
            String tail;
            if (i > 0) 
            {
                head = name.substring(0,i);
                tail = name.substring(i+1);
            } 
            else 
            {
                head = name;
                tail = "";
            }

            //get a child matching the head of the name
            LogNode child = (LogNode)node.children.get(head);
            if (child == null) 
            {
                child = new LogNode(node);
                node.children.put(head, child);
            }
            node = child;
            name = tail;
        }
        return node;
    }


    
    protected class RootLogger extends Logger {
        public RootLogger() {
            super("", null);
        }
    }


    protected static final class LogNode
    {
        Logger logger;

        protected final Map children = new HashMap();

        protected final LogNode parent;

        LogNode(final LogNode parent, final Logger logger)
        {
            this.parent = parent;
            this.logger = logger;
        }

        LogNode(final LogNode parent)
        {
            this(parent, null);
        }

        Logger findParentLogger()
        { 
           
            LogNode nodeParent = parent;
            Logger parentLogger = null;
            while (nodeParent != null)
            {
                if (nodeParent.logger != null)
                {
                    parentLogger = nodeParent.logger;
                    break;
                }
                nodeParent = nodeParent.parent;
            }
            return parentLogger;
        }

        void setParentLogger(final Logger parent)
        {
            for (final Iterator iter = children.values().iterator(); iter.hasNext();)
            {
                final LogNode childNode = (LogNode) iter.next();
                if (childNode.logger == null)
                {
                    childNode.setParentLogger(parent);
                }
                else
                {
                    childNode.logger.setParent(parent);
                }
            }
        }

    }


}
