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

import java.util.Map;

import org.mortbay.hightide.example.auction.util.Utils;
import org.mortbay.util.ajax.JSON.Output;

/**
 * @author Nigel Canonizado
 * 
 * Apr 19, 2006
 */
public class AuctionItem extends BaseObject
{

    private static final long serialVersionUID = -3390759314943527594L;
    private Integer _id;
    // private String id;
    private String _itemName;
    private Seller _seller;
    private Category _category;
    private String _description;
    private Double _initialPrice;

    public AuctionItem()
    {
    }

    public AuctionItem(Integer id, String itemName, Seller seller,
            Category category, String description, Double initialPrice)
    {
        setId(id);
        setItemName(itemName);
        setSeller(seller);
        setCategory(category);
        setDescription(description);
        setInitialPrice(initialPrice);
    }

    public String getFormattedAmount()
    {

        return Utils.formatCurrency(_initialPrice.doubleValue());
    }

    public Integer getId()
    {
        return _id;
    }

    public void setId(Integer aId)
    {
        _id = aId;
    }

    public String getDescription()
    {
        return _description;
    }

    public void setDescription(String aDescription)
    {
        _description = aDescription;
    }

    public Double getInitialPrice()
    {
        return _initialPrice;
    }

    public void setInitialPrice(Double aInitialPrice)
    {
        _initialPrice = aInitialPrice;
    }

    public String getItemName()
    {
        return _itemName;
    }

    public void setItemName(String aItemName)
    {
        _itemName = aItemName;
    }

    public Seller getSeller()
    {
        return _seller;
    }

    public void setSeller(Seller aSeller)
    {
        _seller = aSeller;
    }

    public Category getCategory()
    {
        return _category;
    }

    public void setCategory(Category aCategory)
    {
        _category = aCategory;
    }

    public boolean equals(Object obj)
    {
        if (obj == this)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof AuctionItem))
            return false;
        return ((AuctionItem) obj).getId().equals(_id);
    }

    public int hashCode()
    {

        return _id.hashCode();
    }

    public void fromJSON(Map object)
    {
        _id = new Integer(((Number)object.get("id")).intValue());
        _itemName = (String)object.get("itemName");
        _seller = (Seller)object.get("seller");
        _category = (Category)object.get("category");
        _description = (String)object.get("description");
        _initialPrice = new Double(((Number)object.get("initialPrice")).doubleValue());
    }

    public void toJSON(Output out)
    {
        out.addClass(getClass());
        out.add("id", getId());
        out.add("itemName", getItemName());
        out.add("seller", getSeller());
        out.add("category", getCategory());
        out.add("description", getDescription());
        out.add("initialPrice", getInitialPrice());        
    }

}
