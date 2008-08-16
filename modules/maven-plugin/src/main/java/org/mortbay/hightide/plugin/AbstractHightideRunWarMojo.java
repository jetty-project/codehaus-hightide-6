//========================================================================
//$Id: AbstractJetty6Mojo.java 669 2006-07-10 10:51:55Z janb $
//Copyright 2000-2004 Mort Bay Consulting Pty. Ltd.
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

package org.mortbay.hightide.plugin;

import java.io.File;

import javax.transaction.UserTransaction;

import org.mortbay.jetty.Connector;
import org.mortbay.jetty.RequestLog;
import org.mortbay.jetty.plugin.Jetty6PluginServer;
import org.mortbay.jetty.plugin.util.JettyPluginServer;
import org.mortbay.jetty.security.UserRealm;
import org.mortbay.xml.XmlConfiguration;

/**
 * AbstractHightideRunWarMojo
 *
 * 
 *
 */
public abstract class AbstractHightideRunWarMojo extends AbstractHightideMojo
{
    
    /**
     * List of connectors to use. If none are configured
     * then we use a single SelectChannelConnector at port 8080
     * 
     * @parameter 
     */
    private Connector[] connectors;
    
    
    /**
     * List of security realms to set up. Optional.
     * @parameter
     */
    private UserRealm[] userRealms;
    
    /**
     * Transaction resource. Optional.
     * @parameter
     */
    private UserTransaction transaction;    

    /**
     * A RequestLog implementation to use for the webapp at runtime.
     * Optional.
     * @parameter
     */
    private RequestLog requestLog;
    
    
    
    /**
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#getConfiguredUserRealms()
     */
    public Object[] getConfiguredUserRealms()
    {
        return this.userRealms;
    }

    /**
     * 
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#getConfiguredTransaction()
     */
    public Object getConfiguredTransaction()
    {
        return this.transaction;
    }    

    /**
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#getConfiguredConnectors()
     */
    public Object[] getConfiguredConnectors()
    {
        return this.connectors;
    }

    /**
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#getConfiguredRequestLog()
     */
    public Object getConfiguredRequestLog()
    {
        return this.requestLog;
    }
 
    /**
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#applyJettyXml()
     */
    public void applyJettyXml() throws Exception
    {
        
        if (getJettyXmlFile() == null)
            return;
        
        getLog().info( "Configuring Jetty from xml configuration file = " + getJettyXmlFile() );        
        XmlConfiguration xmlConfiguration = new XmlConfiguration(getJettyXmlFile().toURL());
        xmlConfiguration.configure(getServer().getProxiedObject());   
    }

   
    /**
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#createServer()
     */
    public JettyPluginServer createServer() throws Exception
    {
        return new Jetty6PluginServer();
    }

}
