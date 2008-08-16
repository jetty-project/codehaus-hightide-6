//========================================================================
//$Id: Jetty6RunMojo.java 1570 2007-02-01 18:42:51Z janb $
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

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.mortbay.jetty.Connector;
import org.mortbay.jetty.Handler;
import org.mortbay.jetty.RequestLog;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.handler.ContextHandler;
import org.mortbay.jetty.handler.ContextHandlerCollection;
import org.mortbay.jetty.handler.HandlerCollection;
import org.mortbay.jetty.plugin.Jetty6PluginServer;
import org.mortbay.jetty.plugin.util.JettyPluginServer;
import org.mortbay.jetty.security.UserRealm;
import org.mortbay.xml.XmlConfiguration;

/**
 *  <p>
 *  This goal is used in-situ on a Maven project without first requiring that the project 
 *  is assembled into a war, saving time during the development cycle.
 *  The plugin forks a parallel lifecycle to ensure that the "compile" phase has been completed before invoking Hightide. This means
 *  that you do not need to explicity execute a "mvn compile" first. It also means that a "mvn clean hightide:run" will ensure that
 *  a full fresh compile is done before invoking Hightide.
 *  </p>
 *  <p>
 *  Once invoked, the plugin can be configured to run continuously, scanning for changes in the project and automatically performing a 
 *  hot redeploy when necessary. This allows the developer to concentrate on coding changes to the project using their IDE of choice and have those changes
 *  immediately and transparently reflected in the running web container, eliminating development time that is wasted on rebuilding, reassembling and redeploying.
 *  </p>
 *  <p>
 *  You may also specify the location of a jetty.xml file whose contents will be applied before any plugin configuration.
 *  This can be used, for example, to deploy a static webapp that is not part of your maven build. 
 *  </p>
 *  <p>
 *  There is a <a href="run-mojo.html">reference guide</a> to the configuration parameters for this plugin, and more detailed information
 *  with examples in the <a href="howto.html">Configuration How-To</a>.
 *  </p>
 * @author janb
 * 
 * @goal run
 * @requiresDependencyResolution runtime
 * @execute phase="test-compile"
 * @description Runs Hightide directly from a maven project
 */
public class HightideRunMojo extends AbstractHightideRunMojo
{

    
    /**
     * List of connectors to use. If none are configured
     * then we use a single SelectChannelConnector at port 8080
     * 
     * @parameter 
     */
    private Connector[] connectors;
    
    
    /**
     * List of other contexts to set up. Optional.
     * @parameter
     */
    private ContextHandler[] contextHandlers;
    
    
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
    
    
    public Object getConfiguredRequestLog()
    {
        return this.requestLog;
    }

    
   
    /**
     * 
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#getConfiguredConnectors()
     */
    public Object[] getConfiguredConnectors()
    {
        return this.connectors;
    }

    

    /**
     * 
     * 
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
     * @return Returns the contextHandlers.
     */
    public ContextHandler[] getConfiguredContextHandlers()
    {
        return this.contextHandlers;
    }

    
    /**
     *
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#createServer()
     */
    public JettyPluginServer createServer()
    {
        return new Jetty6PluginServer();
    }
    
    /**
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#finishConfigurationBeforeStart()
     */
    public void finishConfigurationBeforeStart() throws Exception
    {
        Handler[] handlers = getConfiguredContextHandlers();
        JettyPluginServer plugin=getServer();
        Server server=(Server)plugin.getProxiedObject();
        
        HandlerCollection contexts = (HandlerCollection)server.getChildHandlerByClass(ContextHandlerCollection.class);
        if (contexts==null)
            contexts = (HandlerCollection)server.getChildHandlerByClass(HandlerCollection.class);
        
        for (int i=0; (handlers != null) && (i < handlers.length); i++)
        {
            contexts.addHandler(handlers[i]);
        }
    }
    
    /**
     * 
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#applyJettyXml()
     */
    public void applyJettyXml() throws Exception
    {
        if (getJettyXmlFile() == null)
            return;
        
        getLog().info( "Configuring Jetty Hightide from xml configuration file = " + getJettyXmlFile() );        
        XmlConfiguration xmlConfiguration = new XmlConfiguration(getJettyXmlFile().toURL());
        xmlConfiguration.configure(getServer().getProxiedObject());   
    }


    
    
    public void execute() throws MojoExecutionException, MojoFailureException
    {
        super.execute();
    }
}
