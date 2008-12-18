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
import java.util.Map;

import org.mortbay.util.ajax.JSON;
import org.mortbay.util.ajax.JSON.Output;

/**
 * @author Nigel Canonizado
 * 
 * Apr 19, 2006
 */
public abstract class AbstractParticipant extends BaseObject implements JSON.Convertible
{

    private String _name;
    private String _username;
    private String _password;
    private String _address;
    private Date _memberSince;

    public String getName()
    {
        return _name;
    }

    public void setName(String aName)
    {
        _name = aName;
    }

    public String getAddress()
    {
        return _address;
    }

    public void setAddress(String aAddress)
    {
        _address = aAddress;
    }

    public Date getMemberSince()
    {
        return _memberSince;
    }

    public void setMemberSince(Date aMemberSince)
    {
        _memberSince = aMemberSince;
    }

    public String getPassword()
    {
        return _password;
    }

    public void setPassword(String aPassword)
    {
        _password = aPassword;
    }

    public String getUsername()
    {
        return _username;
    }

    public void setUsername(String aUsername)
    {
        _username = aUsername;
    }
    
    public void fromJSON(Map object)
    {
        _name = (String)object.get("name");
        _username = (String)object.get("username");
        //_password = (String)object.get("password");
        _address = (String)object.get("address");
        //_memberSince = (Date)object.get("memberSince");
    }
    
    public void toJSON(Output out)
    {
        out.addClass(getClass());
        out.add("name", getName());
        out.add("username", getUsername());
        //out.add("password", getPassword());
        out.add("address", getAddress());
        //out.add("memberSince", getMemberSince());        
    }

}
