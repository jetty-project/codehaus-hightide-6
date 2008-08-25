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
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import org.mortbay.hightide.example.auction.Bid;
import org.mortbay.hightide.example.auction.util.DBUtil;


/**
 * @author Nigel Canonizado
 *
 * Apr 19, 2006
 */
public class AuctionDao {
    
 
    public List getAllBids(Integer itemId) 
    throws Exception
    {
    	String sql = "select * from bids where itemId = "+itemId;
    	return getListOfBids(sql);
    }
    

    public void checkBids ()
    throws Exception
    {
       
            String sql = "select * from bids";
            Connection conn = null;
            Statement stmt = null;
            
            try 
            {
                conn = DBUtil.getDatasource().getConnection();               
                stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql);
            }
            catch (Exception e)
            {
                e.printStackTrace();
                throw e;
            }
            finally
            {
                DBUtil.closeStatement(stmt);
                DBUtil.closeConnection(conn);
            }
   
    }
 
    
    public void saveAuctionBid(Bid bid) 
    throws Exception
    {
    	String sql = "insert into bids(itemId, bidder, amount) VALUES (" + bid.getItemId() + ", '" + bid.getBidder() + "', " + bid.getAmount()+ ")";
    	Statement stmt = null;
    	Connection conn = null;
    	
    	try 
    	{
    		conn = DBUtil.getDatasource().getConnection();
    		stmt = conn.createStatement();
    		stmt.executeUpdate(sql);
    	}
        finally
    	{
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }
 
    }
    
    public Bid getHighestBid (Integer itemId)
    throws Exception
    {
        
        checkBids();
        
        String sql = "SELECT b.bidder, b.amount FROM bids b, (SELECT max(amount) as maxamt, itemId FROM bids where itemId="+itemId+" GROUP BY itemId)maxbids WHERE b.itemId = maxbids.itemId AND b.amount= maxbids.maxamt";
        
        Statement stmt = null;
        Connection conn = null;
        Bid bid = null;
        try 
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            if (rs.next()) 
            {
                bid = new Bid();
                bid.setItemId(itemId);
                bid.setBidder(rs.getString(1));
                bid.setAmount(new Double(rs.getDouble(2)));
            }
            return bid;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        finally
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }
    }
    
    
    
    
    private List getListOfBids(String sql) 
    throws Exception
    {
    	List allBids = new ArrayList();
    	Statement stmt = null;
    	Connection conn = null;
    	
    	try 
    	{
    		conn = DBUtil.getDatasource().getConnection();
    		stmt = conn.createStatement();
    		ResultSet rs = stmt.executeQuery(sql);
    		while (rs.next()) 
    		{
    			Bid bidCounter = getBidItem(rs);
    			allBids.add(bidCounter);
    		}
    	}
    	finally 
    	{
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
    	}
		return allBids;
    }
    
 
    
    private Bid getBidItem(ResultSet rs) throws SQLException 
    {
    	Bid bidCounter = new Bid();
    	bidCounter.setItemId(new Integer(rs.getInt("itemId")));
    	bidCounter.setBidder(rs.getString("bidder"));
    	bidCounter.setAmount(new Double(rs.getDouble("amount")));
    	
		return bidCounter;
    	
    }
    
 
    
}
