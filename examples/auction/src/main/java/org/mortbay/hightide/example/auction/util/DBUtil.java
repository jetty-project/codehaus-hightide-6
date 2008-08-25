//========================================================================
//Copyright 2006 Webtide LLC
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

package org.mortbay.hightide.example.auction.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import javax.transaction.UserTransaction;

/**
 * @author Nigel Canonizado
 *
 */
public class DBUtil 
{
	
	private static DataSource datasource;
	private static UserTransaction userTx;
    
    public static DataSource getDatasource() throws NamingException 
    {
    	if(datasource!=null)
    		return datasource;
        InitialContext ic = new InitialContext();
        datasource = (DataSource) ic.lookup("java:comp/env/jdbc/auctionds");
        return datasource;
    }
    
    public static UserTransaction getUserTransaction() throws NamingException 
    {
    	if(userTx!=null)
    		return userTx;
        InitialContext ic = new InitialContext();
        userTx = (UserTransaction) ic.lookup("java:comp/UserTransaction");
        return userTx;
    }
    
    public static void closeConnection(Connection conn) 
    {
        if (conn != null) 
        {
            try 
            {
                conn.close();
            } catch (SQLException e) 
            {
                e.printStackTrace();
            }
        }
    }
    
    public static void closeStatement(Statement stmt) 
    {
        if (stmt != null) 
        {
            try 
            {
                stmt.close();
            } catch (SQLException e) 
            {
                e.printStackTrace();
            }
        }
    }

}
