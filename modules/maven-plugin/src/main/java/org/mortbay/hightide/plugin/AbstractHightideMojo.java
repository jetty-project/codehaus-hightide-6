package org.mortbay.hightide.plugin;


import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.transaction.UserTransaction;


import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.project.MavenProject;
import org.mortbay.jetty.plugin.Jetty6PluginWebAppContext;
import org.mortbay.jetty.plugin.util.JettyPluginServer;
import org.mortbay.jetty.plugin.util.PluginLog;
import org.mortbay.util.Scanner;
import org.mortbay.jetty.plugin.util.SystemProperty;



/**
 * AbstractHightideMojo
 *
 *
 */
public abstract class AbstractHightideMojo extends AbstractMojo
{   

    /**
     * The proxy for the Server object
     */
    private JettyPluginServer server;
    
    /**
     * The "virtual" webapp created by the plugin
     * @parameter
     */
    protected Jetty6PluginWebAppContext webAppConfig;
    
    /**
     * The maven project.
     *
     * @parameter expression="${executedProject}"
     * @required
     * @readonly
     */
    private MavenProject project;
    

    
    /**
     * The context path for the webapp. Defaults to the
     * name of the webapp's artifact.
     * 
     * @parameter expression="/${project.artifactId}"
     * @required
     */
    private String contextPath;
    
    
    /**
     * The temporary directory to use for the webapp.
     * Defaults to target/work
     * 
     * @parameter expression="${project.build.directory}/work"
     * @required
     */
    private File tmpDirectory;
    
    
    
    /**
     * A webdefault.xml file to use instead
     * of the default for the webapp. Optional.
     * 
     * @parameter 
     */
    private File webDefaultXml;
    
    
    /**
     * A web.xml file to be applied AFTER
     * the webapp's web.xml file. Useful for
     * applying different build profiles, eg
     * test, production etc. Optional.
     * @parameter
     */
    private File overrideWebXml;
    
    /**
     * The interval in seconds to scan the webapp for changes 
     * and restart the context if necessary. Disabled by default.
     * 
     * @parameter expression="0"
     * @required
     */
    private int scanIntervalSeconds;
    
    
    /**
     * System properties to set before execution. 
     * Note that these properties will NOT override System properties 
     * that have been set on the command line or by the JVM. Optional.
     * @parameter 
     */
    private SystemProperty[] systemProperties;
    
    
    
    /**
     * Location of a jetty xml configuration file whose contents 
     * will be applied before any plugin configuration. Optional.
     * @parameter
     */
    private File jettyConfig;
  
    
    /**
     * A scanner to check for changes to the webapp
     */
    private Scanner scanner;
    
    /**
     *  List of files and directories to scan
     */
    private ArrayList scanList;
    
    /**
     * List of Listeners for the scanner
     */
    private ArrayList scannerListeners;
    
    
    public String PORT_SYSPROPERTY = "jetty.port";
    
    protected static String DERBY_SYSTEM_HOME = "target/database";
    
    protected static String DEFAULT_JMS_JNDI_NAME = "jms/loggingTopicConnectionFactory";
    
    protected static String DEFAULT_AMQ_BROKER_URL = "vm://localhost?broker.persistent=false";
    
    protected static String AMQ_XBEAN_CONFIG_LOCATION = "xbean:activemq.xml";
    
    /**
     * @return Returns the realms configured in the pom
     */
    public abstract Object[] getConfiguredUserRealms();
    
    /**
     * @return Returns the connectors configured in the pom
     */
    public abstract Object[] getConfiguredConnectors();

    public abstract Object getConfiguredRequestLog();
    
    public abstract Object getConfiguredTransaction();

    public abstract void checkPomConfiguration() throws MojoExecutionException;
    
    
    
    public abstract void configureScanner () throws MojoExecutionException;
    
    
    public abstract void applyJettyXml () throws Exception;
    
    
    /**
     * create a proxy that wraps a particular jetty version Server object
     * @return
     */
    public abstract JettyPluginServer createServer() throws Exception;
    
    
    public abstract void finishConfigurationBeforeStart() throws Exception;
    
    
    public MavenProject getProject()
    {
        return this.project;
    }
    
    public File getTmpDirectory()
    {
        return this.tmpDirectory;
    }

    
    public File getWebDefaultXml()
    {
        return this.webDefaultXml;
    }
    
    public File getOverrideWebXml()
    {
        return this.overrideWebXml;
    }
    
    /**
     * @return Returns the contextPath.
     */
    public String getContextPath()
    {
        return this.contextPath;
    }

    /**
     * @return Returns the scanIntervalSeconds.
     */
    public int getScanIntervalSeconds()
    {
        return this.scanIntervalSeconds;
    }
    

    public SystemProperty[] getSystemProperties()
    {
        return this.systemProperties;
    }

    public File getJettyXmlFile ()
    {
        return this.jettyConfig;
    }

    public JettyPluginServer getServer ()
    {
        return this.server;
    }
    
    public void setServer (JettyPluginServer server)
    {
        this.server = server;
    }
    
    
    public void setScanList (ArrayList list)
    {
        this.scanList = new ArrayList(list);
    }
    
    public ArrayList getScanList ()
    {
        return this.scanList;
    }
    
    
    public void setScannerListeners (ArrayList listeners)
    {
        this.scannerListeners = new ArrayList(listeners);
    }
    
    public ArrayList getScannerListeners ()
    {
        return this.scannerListeners;
    }
    
    public Scanner getScanner ()
    {
        return scanner;
    }
    
    public void execute() throws MojoExecutionException, MojoFailureException
    {
        getLog().info("Configuring Jetty Hightide for project: " + getProject().getName());
        PluginLog.setLog(getLog());
        checkPomConfiguration();
        startJetty();
    }
    
    
    public void startJetty () throws MojoExecutionException
    {
        try 
        {
            getLog().debug("Starting Jetty Hightide Server ...");
            
            configureSystemProperties();
            setServer(createServer());
        
            //apply any config from a jetty.xml file first which is able to 
            //be overwritten by config in the pom.xml
            applyJettyXml ();

            JettyPluginServer plugin=getServer();
            
            // setup transaction resource if any
            if (getConfiguredTransaction() != null)
            	new org.mortbay.jetty.plus.naming.Transaction((UserTransaction)getConfiguredTransaction());
            else
            	new org.mortbay.jetty.plus.naming.Transaction(new com.atomikos.icatch.jta.UserTransactionImp());
            
            org.apache.activemq.broker.BrokerFactory.createBroker(new java.net.URI(AMQ_XBEAN_CONFIG_LOCATION));
            // setup TopicConnectionFactory for the debug log
            new org.mortbay.jetty.plus.naming.Resource(DEFAULT_JMS_JNDI_NAME, new org.apache.activemq.ActiveMQConnectionFactory(DEFAULT_AMQ_BROKER_URL));
            if(System.getProperty("derby.system.home")==null)
            	System.setProperty("derby.system.home", DERBY_SYSTEM_HOME);
            else
            	getLog().info("Derby embedded location: " + System.getProperty("derby.system.home"));
            // if the user hasn't configured their project's pom to use a
            // different set of connectors,
            // use the default
            Object[] configuredConnectors = getConfiguredConnectors();
            
            plugin.setConnectors(configuredConnectors);
            Object[] connectors = plugin.getConnectors();
            
            if (connectors == null|| connectors.length == 0)
            {
                //if a SystemProperty -Djetty.port=<portnum> has been supplied, use that as the default port
                configuredConnectors = new Object[] { plugin.createDefaultConnector(System.getProperty(PORT_SYSPROPERTY, null)) };
                plugin.setConnectors(configuredConnectors);
            }
       
            
            //set up a RequestLog if one is provided
            if (getConfiguredRequestLog() != null)
                getServer().setRequestLog(getConfiguredRequestLog());
            
            //set up the webapp and any context provided
            getServer().configureHandlers();
            configureWebApplication();
            getServer().addWebApplication(webAppConfig);
            
            
            // set up security realms
            Object[] configuredRealms = getConfiguredUserRealms();
            for (int i = 0; (configuredRealms != null) && i < configuredRealms.length; i++)
                getLog().debug(configuredRealms[i].getClass().getName() + ": "+ configuredRealms[i].toString());
            
            plugin.setUserRealms(configuredRealms);
            
            //do any other configuration required by the
            //particular Jetty Hightide version
            finishConfigurationBeforeStart();   
            
            // start Jetty Hightide
            server.start();

            getLog().info("Started Jetty Hightide Server");
            
            // start the scanner thread (if necessary) on the main webapp
            configureScanner ();            
            startScanner();
            
            // keep the thread going
            server.join();
        }
        catch (Exception e)
        {
            throw new MojoExecutionException("Failure", e);
        }
        finally
        {
            getLog().info("Jetty Hightide server exiting.");
        }
        
    }
    
    

    /**
     * Subclasses should invoke this to setup basic info
     * on the webapp
     * 
     * @throws MojoExecutionException
     */
    public void configureWebApplication () throws Exception
    {
        //use EITHER a <webAppConfig> element or the now deprecated <contextPath>, <tmpDirectory>, <webDefaultXml>, <overrideWebXml>
        //way of doing things
        if (webAppConfig == null)
        {
            webAppConfig = new Jetty6PluginWebAppContext();
            webAppConfig.setContextPath((getContextPath().startsWith("/") ? getContextPath() : "/"+ getContextPath()));
            if (getTmpDirectory() != null)
                webAppConfig.setTempDirectory(getTmpDirectory());          
            if (getWebDefaultXml() != null)
                webAppConfig.setDefaultsDescriptor(getWebDefaultXml().getCanonicalPath());
            if (getOverrideWebXml() != null)
                webAppConfig.setOverrideDescriptor(getOverrideWebXml().getCanonicalPath());
        }

          
        getLog().info("Context path = " + webAppConfig.getContextPath());
        getLog().info("Tmp directory = "+ " determined at runtime");
        getLog().info("Web defaults = "+(webAppConfig.getDefaultsDescriptor()==null?" jetty default":webAppConfig.getDefaultsDescriptor()));
        getLog().info("Web overrides = "+(webAppConfig.getOverrideDescriptor()==null?" none":webAppConfig.getOverrideDescriptor()));
    }
    
    /**
     * Run a scanner thread on the given list of files and directories, calling
     * stop/start on the given list of LifeCycle objects if any of the watched
     * files change.
     * 
     */
    private void startScanner()
    {
        // check if scanning is enabled
        if (getScanIntervalSeconds() <= 0) return;

        scanner = new Scanner();
        scanner.setReportExistingFilesOnStartup(false);
        scanner.setScanInterval(getScanIntervalSeconds());
        scanner.setScanDirs(getScanList());
        List listeners = getScannerListeners();
        Iterator itor = (listeners==null?null:listeners.iterator());
        while (itor!=null && itor.hasNext())
            scanner.addListener((Scanner.Listener)itor.next());
        getLog().info("Starting scanner at interval of " + getScanIntervalSeconds()+ " seconds.");
        scanner.start();
    }
    
    private void configureSystemProperties ()
    {
        // get the system properties set up
        for (int i = 0; (getSystemProperties() != null) && i < getSystemProperties().length; i++)
        {
            boolean result = getSystemProperties()[i].setIfNotSetAlready();
            getLog().info("Property " + getSystemProperties()[i].getName() + "="
                    + getSystemProperties()[i].getValue() + " was "
                    + (result ? "set" : "skipped"));
        }
    }
    
    /**
     * Try and find a jetty-web.xml file, using some
     * historical naming conventions if necessary.
     * @param webInfDir
     * @return
     */
    public File findJettyWebXmlFile (File webInfDir)
    {
        if (webInfDir == null)
            return null;
        if (!webInfDir.exists())
            return null;
        
        File f = new File (webInfDir, "jetty-web.xml");
        if (f.exists())
            return f;
        
        //try some historical alternatives
        f = new File (webInfDir, "web-jetty.xml");
        if (f.exists())
            return f;
        f = new File (webInfDir, "jetty6-web.xml");
        if (f.exists())
            return f;
        
        return null;
    }
}
