// ========================================================================
// Copyright 2006 Webtide LLC
// ------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at 
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ========================================================================


package org.mortbay.hightide.example.auction.dao;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;


import javax.transaction.UserTransaction;

import org.mortbay.hightide.example.auction.Bidder;
import org.mortbay.hightide.example.auction.util.DBUtil;

public class BidderDao
{
    
    public Bidder getBidder (String username)
    throws Exception 
    {       
        String sqlSelect = "select * from bidders where username = '"+username+"'";
    
        Connection conn = null;
        Statement stmt = null;
        try
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            ResultSet results = stmt.executeQuery(sqlSelect);
            
            if (results.next())
            {
                Bidder bidder = new Bidder();
                bidder.setId(new Integer(results.getInt(1)));
                bidder.setUsername(results.getString(2));
                return bidder;
            }
            
            return null;
        }
        finally
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        } 
    }
    
    public boolean addBidder (String username)
    throws Exception
    {            
        UserTransaction transaction = null;
        
        try
        {
            transaction = DBUtil.getUserTransaction();
            transaction.begin();
            Bidder bidder = getBidder(username);
            if (bidder == null)
            {
                //bidder by same name does not already exist
                createBidder(username);
                transaction.commit();
                return true;
            }
            else
            {
                // user already exists
                transaction.rollback();
                return false;
            }
        }
        catch (Exception e)
        {
            transaction.rollback();
            throw e;
        }
    }
    
    
    private void createBidder (String username)
    throws Exception
    {  
        String sqlInsert = "insert into bidders (username) values ('"+username+"')";
        Connection conn = null;
        Statement stmt = null;
        try
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            stmt.executeUpdate(sqlInsert);
            
        }
        finally
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }   
    }

    
    
}
