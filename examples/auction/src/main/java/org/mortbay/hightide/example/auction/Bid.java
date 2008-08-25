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
 * May 1, 2006
 */
public class Bid {
    
    private Integer itemId;
    private Double amount;
    private String bidder;
    
    public Double getAmount() {
        return amount;
    }
    
    public String getFormattedAmount () {
        if (amount == null)
            return "";
        
        return Utils.formatCurrency(getAmount().doubleValue());
    }
    public void setAmount(Double aAmount) {
        amount = aAmount;
    }
    
    public Integer getItemId () {
        return this.itemId;
    }
    public void setItemId(Integer itemId) {
    	this.itemId = itemId;
    }
    public String getBidder() {
        return bidder;
    }
    
    public void setBidder(String aBidder) {
        bidder = aBidder;
    }
    

}
