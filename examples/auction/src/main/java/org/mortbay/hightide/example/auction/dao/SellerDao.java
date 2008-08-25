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
import java.util.Collection;
import java.util.List;

import javax.naming.NamingException;

import org.mortbay.hightide.example.auction.Seller;
import org.mortbay.hightide.example.auction.util.DBUtil;


/**
 * @author Nigel Canonizado
 *
 * Apr 25, 2006
 */
public class SellerDao {
    
    public Seller getSeller(int sellerId) 
    {
        String sql = "select * from seller where id = " + sellerId;
        List sellers = getSellersList(sql);
        Seller seller = null;
        if (sellers.size() > 0)
            seller = (Seller) sellers.get(0);
        return seller;
    }
    
    private List getSellersList(String sql) 
    {
        List sellers = new ArrayList();
        
        Statement stmt = null;
        Connection conn = null;
        
        try 
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) 
            {
                Seller seller = getSellerObj(rs);
                sellers.add(seller);
            }
        } catch (Exception e) 
        {
        }
        finally 
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }
        
        return sellers;
    }
    
    private Seller getSellerObj(ResultSet rs) throws SQLException 
    {
        Seller seller = new Seller();
        seller.setId(new Integer(rs.getInt("id")));
        seller.setName(rs.getString("name"));
        seller.setUsername(rs.getString("username"));
        seller.setPassword(rs.getString("password"));
        seller.setAddress(rs.getString("address"));
        seller.setMemberSince(rs.getDate("memberSince"));
        seller.setStatus(rs.getString("status"));
        
        return seller;
    }
}
