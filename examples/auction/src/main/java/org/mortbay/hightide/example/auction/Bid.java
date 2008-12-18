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

import java.io.Serializable;
import java.util.Map;

import org.mortbay.hightide.example.auction.util.Utils;
import org.mortbay.util.ajax.JSON;
import org.mortbay.util.ajax.JSON.Output;

/**
 * @author Nigel Canonizado
 * 
 * May 1, 2006
 */
public class Bid implements Serializable, JSON.Convertible
{

    private Integer _itemId;
    private Double _amount;
    private String _bidder;

    public Double getAmount()
    {
        return _amount;
    }

    public String getFormattedAmount()
    {
        if (_amount == null)
            return "";

        return Utils.formatCurrency(getAmount().doubleValue());
    }

    public void setAmount(Double aAmount)
    {
        _amount = aAmount;
    }

    public Integer getItemId()
    {
        return _itemId;
    }

    public void setItemId(Integer itemId)
    {
        _itemId = itemId;
    }

    public String getBidder()
    {
        return _bidder;
    }

    public void setBidder(String aBidder)
    {
        _bidder = aBidder;
    }

    public void fromJSON(Map object)
    {        
        _itemId = (Integer)object.get("itemId");
        _amount = (Double)object.get("amount");
        _bidder = (String)object.get("bidder");        
    }

    public void toJSON(Output out)
    {
        out.addClass(getClass());
        out.add("amount", getAmount());
        out.add("formattedAmount", getFormattedAmount());
        out.add("itemId", getItemId());
        out.add("bidder", getBidder());        
    }

}
