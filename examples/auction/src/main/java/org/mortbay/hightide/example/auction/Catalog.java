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


package org.mortbay.hightide.example.auction;

import java.util.ArrayList;
import java.util.List;

import org.mortbay.hightide.example.auction.dao.AuctionDao;
import org.mortbay.hightide.example.auction.dao.CategoryDao;

public class Catalog 
{
    
    
    private List _categories;
    
    public Catalog()
    {
        _categories = new ArrayList();
        _categories = new CategoryDao().getAllCategories();
    }
  
    
    public  List  getCategories()
    {   
        return _categories;
    }
    
  
    public List getItemsInCategory (Integer categoryId)
    throws Exception
    {
        return new CategoryDao().getItemsInCategory(categoryId);
    }
    
  
    public List findItems (String searchExp)
    throws Exception
    {
        return new CategoryDao().findItems(searchExp);
    }
    
    public AuctionItem getItem(Integer itemId)
    throws Exception
    {
        return new CategoryDao().getItem(itemId.intValue());
    }

}
