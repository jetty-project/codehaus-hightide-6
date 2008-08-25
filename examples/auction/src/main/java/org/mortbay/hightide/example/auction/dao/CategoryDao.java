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
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.mortbay.hightide.example.auction.AuctionItem;
import org.mortbay.hightide.example.auction.Category;
import org.mortbay.hightide.example.auction.Seller;
import org.mortbay.hightide.example.auction.util.DBUtil;

/**
 * @author Nigel Canonizado
 *
 * Apr 26, 2006
 */
public class CategoryDao {
    
    
    public List getItemsInCategory(Integer categoryId)
    throws Exception
    {
        return getItemsList("select * from auctionitem where categoryId = "+categoryId);
    }
        
    public Category getCategory(int categoryId) 
    {
        String sql = "select * from category where id = " + categoryId;
        List categories = getCategoriesList(sql);
        Category category = null;
        if (categories.size() > 0) 
            category = (Category) categories.get(0);

        return category;
    }
    

    private List getItemsList(String sql) 
    throws Exception
    {
        List foundItems = new ArrayList();
        
        Statement stmt = null;
        Connection conn = null;
        try 
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) 
            {
                AuctionItem auctionItem = getAuctionItem(rs);
                foundItems.add(auctionItem);
            }
        }
        finally 
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }
        
        return foundItems;
    }
    
    public List getAllCategories() 
    {
        String sql = "select * from category order by categoryName";
        return getCategoriesList(sql);
    }
    
    
    public List findItems(String expression) 
    throws Exception
    {
        if (expression==null || expression.equals(""))
            return Collections.EMPTY_LIST;
        
        String expr = expression.toLowerCase();

        return getItemsList("select * from auctionitem where LOWER(itemName) like '%" + expr + 
                "%' or LOWER(description) like '%" + expr + "%'");
    }
    
    public AuctionItem getItem(int itemId)
    throws Exception
    {
        String sql = "select * from auctionitem where id = " + itemId;
        List itemList = getItemsList(sql);
        AuctionItem item = null;
        if (itemList.size() > 0) 
            item = (AuctionItem) itemList.get(0);
        return item;
    } 
    
 
    
    public Collection getAllItems() 
    throws Exception
    {
        String sql = "select * from auctionitem";
        return getItemsList(sql);
    }
    
  
    
    private List getCategoriesList(String sql) 
    {
        List categories = new ArrayList();
        
        Statement stmt = null;
        Connection conn = null;
        
        try 
        {
            conn = DBUtil.getDatasource().getConnection();
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) 
            {
                Category category = getCategoryObj(rs);
                categories.add(category);
            }
        }
        catch (Exception e) 
        {
        }
        finally 
        {
            DBUtil.closeStatement(stmt);
            DBUtil.closeConnection(conn);
        }
        return categories;
    }
    
    private Category getCategoryObj(ResultSet rs) throws SQLException 
    {
        Category category = new Category();
        category.setId(new Integer(rs.getInt("id")));
        category.setCategoryName(rs.getString("categoryName"));
        category.setDescription(rs.getString("description"));
        
        return category;
    }
    
    private Category findCategory(int categoryId) 
    {
        CategoryDao categoryDao = new CategoryDao();
        Category category = categoryDao.getCategory(categoryId);
        return category;
    }
    

    private Seller findSeller(int sellerId) 
    {
        SellerDao sellerDao = new SellerDao();
        Seller seller = sellerDao.getSeller(sellerId);
        return seller;
    }
    
    private AuctionItem getAuctionItem(ResultSet rs) throws SQLException
    {
        AuctionItem auctionItem = new AuctionItem();
        auctionItem.setId(new Integer(rs.getInt("id")));
        auctionItem.setItemName(rs.getString("itemName"));
        auctionItem.setSeller(findSeller(rs.getInt("sellerId")));
        auctionItem.setCategory(findCategory(rs.getInt("categoryId")));
        auctionItem.setDescription(rs.getString("description"));
        auctionItem.setInitialPrice(new Double(rs.getDouble("initialPrice")));
        
        return auctionItem;
    }
    
}
