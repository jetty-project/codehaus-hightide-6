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

import org.mortbay.hightide.example.auction.util.Utils;


/**
 * @author Nigel Canonizado
 *
 * Apr 19, 2006
 */
public class AuctionItem extends BaseObject {
    
    private static final long serialVersionUID = -3390759314943527594L;
    private Integer id;
    //private String id;
    private String itemName;
    private Seller seller;
    private Category category;
    private String description;
    private Double initialPrice;
    
    public AuctionItem() {};
    
    public AuctionItem(Integer id, String itemName, 
                       Seller seller, Category category, String description, Double initialPrice) {
        setId(id);
        setItemName(itemName);
        setSeller(seller);
        setCategory(category);
        setDescription(description);
        setInitialPrice(initialPrice);
    }
    
    public String getFormattedAmount() {
        
        return Utils.formatCurrency(initialPrice.doubleValue());
    } 
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer aId) {
        id = aId;
    }

    public String getDescription() {
        return description;
    }
    
    public void setDescription(String aDescription) {
        description = aDescription;
    }
    
    public Double getInitialPrice() {
        return initialPrice;
    }
    
    public void setInitialPrice(Double aInitialPrice) {
        initialPrice = aInitialPrice;
    }
    
    public String getItemName() {
        return itemName;
    }
    
    public void setItemName(String aItemName) {
        itemName = aItemName;
    }
    
    public Seller getSeller() {
        return seller;
    }
    
    public void setSeller(Seller aSeller) {
        seller = aSeller;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category aCategory) {
        category = aCategory;
    }

    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null) return false;
        if (!(obj instanceof AuctionItem)) return false;
        return ((AuctionItem) obj).getId().equals(id);
    }

    
    public int hashCode() {
        
        return id.hashCode();
    }
    
    
    
}
