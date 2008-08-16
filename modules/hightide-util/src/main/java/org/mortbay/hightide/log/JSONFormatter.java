package org.mortbay.hightide.log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Formatter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;

public class JSONFormatter extends Formatter
{
    SimpleDateFormat _formatter = new SimpleDateFormat("yyyy.MM.dd G 'at' HH:mm:ss z");
    
    public String format(LogRecord record)
    {
        StringBuffer strbuff = new StringBuffer();
        long millis = record.getMillis();
        String date = _formatter.format(new Date(millis));
        long seq = record.getSequenceNumber();
        String logger = record.getLoggerName();
        Level level = record.getLevel();
        String sourceClass = record.getSourceClassName();
        String sourceMethod = record.getSourceMethodName();
        int threadNum = record.getThreadID();
        String message = record.getMessage();
        Throwable sourceThrown = record.getThrown();
        
        strbuff.append("{");
        
        writeJSON(strbuff,"logDate", date);

        strbuff.append(",");
        writeJSON(strbuff,"millis",String.valueOf(millis));

        strbuff.append(",");
        writeJSON(strbuff,"sequence",String.valueOf(seq));

        
        if (logger!=null)
        {
            strbuff.append(",");
            writeJSON(strbuff,"logger",logger);
        }
            
        strbuff.append(",");
        writeJSON(strbuff,"level",level.getName());
        
        if (sourceClass !=null)
        {
            strbuff.append(",");
            writeJSON(strbuff,"sourceClass",sourceClass);
        }
        
        if (sourceMethod != null)
        {
            strbuff.append(",");
            writeJSON(strbuff,"sourceMethod",sourceMethod);
        }
        
        strbuff.append(",");
        writeJSON(strbuff,"thread",String.valueOf(threadNum));
        
        if (message !=null)
        {
        strbuff.append(",");
        writeJSON(strbuff,"message", message);
        }
        
        if (sourceThrown != null)
        {
            strbuff.append(",");
            strbuff.append("\"exception\": {");
            writeJSON(strbuff, "message", sourceThrown.getMessage());
            StackTraceElement[] frames = sourceThrown.getStackTrace();
            if (frames != null)
            {
                strbuff.append(",");
                strbuff.append("\"frames\": [");

                for (int i=0;i<frames.length;i++)
                {
                    strbuff.append("{ \"sourceClass\": \""+frames[i].getClassName()+"\", \"sourceMethod\": \""+frames[i].getMethodName()+"\","+" \"line\": \""+frames[i].getLineNumber()+"\" }");
                    if (i<frames.length-1)
                        strbuff.append(",");
                }  
                strbuff.append("]");
            }        
            strbuff.append("}");  
            
        }
        strbuff.append("}");  

        return strbuff.toString();
    }

    public String getHead (Handler handler)
    {
        return "{ \"record\": ";
    }
    
    public String getTail (Handler handler)
    {
        return "}";
    }
    
    private void writeJSON (StringBuffer buff, String name, String value)
    {
        buff.append("\""+name+"\": "+"\""+value+"\"");
    }
}
