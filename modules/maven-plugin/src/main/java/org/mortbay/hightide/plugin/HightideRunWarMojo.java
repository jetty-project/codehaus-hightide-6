//========================================================================
//$Id: Jetty6RunWar.java 1703 2007-03-28 05:04:41Z janb $
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
import java.util.ArrayList;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.mortbay.util.Scanner;

/**
 * <p>
 *  This goal is used to assemble your webapp into a war and automatically deploy it to Hightide.
 *  </p>
 *  <p>
 *  Once invoked, the plugin can be configured to run continuously, scanning for changes in the project and to the
 *  war file and automatically performing a 
 *  hot redeploy when necessary. 
 *  </p>
 *  <p>
 *  You may also specify the location of a jetty.xml file whose contents will be applied before any plugin configuration.
 *  This can be used, for example, to deploy a static webapp that is not part of your maven build. 
 *  </p>
 *  <p>
 *  There is a <a href="run-mojo.html">reference guide</a> to the configuration parameters for this plugin, and more detailed information
 *  with examples in the <a href="howto.html">Configuration How-To</a>.
 *  </p>
 * 
 * @goal run-war
 * @requiresDependencyResolution runtime
 * @execute phase="package"
 * @description Runs hightide on a war file
 *
 */
public class HightideRunWarMojo extends AbstractHightideRunWarMojo
{

    /**
     * The location of the war file.
     * @parameter expression="${project.build.directory}/${project.build.finalName}.war"
     * @required
     */
    private File webApp;


    
    /**
     * @see org.apache.maven.plugin.Mojo#execute()
     */
    public void execute() throws MojoExecutionException, MojoFailureException
    {
        super.execute();  
    }



    public void configureWebApplication () throws Exception
    {
        super.configureWebApplication();
        
        webAppConfig.setWar(webApp.getCanonicalPath());
        webAppConfig.configure();
    }
 


    /**
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#checkPomConfiguration()
     */
    public void checkPomConfiguration() throws MojoExecutionException
    {
       return;        
    }



    /* (non-Javadoc)
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#configureScanner()
     */
    public void configureScanner() throws MojoExecutionException
    {
        final ArrayList scanList = new ArrayList();
        scanList.add(getProject().getFile());
        scanList.add(webApp);
        setScanList(scanList);
        
        ArrayList listeners = new ArrayList();
        listeners.add(new Scanner.BulkListener()
        {
            public void filesChanged(List changes)
            {
                try
                {
                    boolean reconfigure = changes.contains(getProject().getFile().getCanonicalPath());
                    restartWebApp(reconfigure);
                }
                catch (Exception e)
                {
                    getLog().error("Error reconfiguring/restarting webapp after change in watched files",e);
                }
            }
        });
        setScannerListeners(listeners);          
    }


    

    public void restartWebApp(boolean reconfigureScanner) throws Exception 
    {
        getLog().info("Restarting webapp ...");
        getLog().debug("Stopping webapp ...");
        webAppConfig.stop();
        getLog().debug("Reconfiguring webapp ...");

        checkPomConfiguration();

        // check if we need to reconfigure the scanner,
        // which is if the pom changes
        if (reconfigureScanner)
        {
            getLog().info("Reconfiguring scanner after change to pom.xml ...");
            ArrayList scanList = getScanList();
            scanList.clear();
            scanList.add(getProject().getFile());
            scanList.add(webApp);
            setScanList(scanList);
            getScanner().setScanDirs(scanList);
        }

        getLog().debug("Restarting webapp ...");
        webAppConfig.start();
        getLog().info("Restart completed.");
    }



    /**
     * @see org.mortbay.hightide.plugin.AbstractHightideMojo#finishConfigurationBeforeStart()
     */
    public void finishConfigurationBeforeStart()
    {
        return;
    }
       
}
