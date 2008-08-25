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


/**
 * @author Nigel Canonizado
 *
 * Apr 19, 2006
 */
public class Bidder extends AbstractParticipant {
    
    private Integer id;
    private String cardNumber;
    
    public Bidder()
    {      
    }
    
    public Bidder(Integer id, String name, String username, String password, String address, String cardNumber) {
        
        setId(id);
        setName(name);
        setUsername(username);
        setPassword(password);
        setAddress(address);
        setCardNumber(cardNumber);
    } 
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer aId) {
        id = aId;
    }

    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String aCardNumber) {
        cardNumber = aCardNumber;
    }

     public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null) return false;
        if (!(obj instanceof Bidder)) return false;
        return ((Bidder) obj).getName().equals(getUsername());
    }
    
     public int hashCode ()
     {
         if (getUsername() == null)
             return 0;
         return getUsername().hashCode();
     }
}
