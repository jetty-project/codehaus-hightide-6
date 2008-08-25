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

import java.util.Date;

/**
 * @author Nigel Canonizado
 *
 * Apr 19, 2006
 */
public abstract class AbstractParticipant extends BaseObject {
    
    private String name;
    private String username;
    private String password;
    private String address;
    private Date memberSince;
    
    public String getName() {
        return name;
    }
    public void setName(String aName) {
        name = aName;
    }

    public String getAddress() {
        return address;
    }
    
    public void setAddress(String aAddress) {
        address = aAddress;
    }
    
    public Date getMemberSince() {
        return memberSince;
    }
    
    public void setMemberSince(Date aMemberSince) {
        memberSince = aMemberSince;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String aPassword) {
        password = aPassword;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String aUsername) {
        username = aUsername;
    }

    

}
