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

import org.mortbay.util.ajax.JSON.Output;

/**
 * @author Nigel Canonizado
 * 
 * Apr 26, 2006
 */
public class Category extends BaseObject
{

    private Integer _id;
    private String _categoryName;
    private String _description;

    public Category()
    {
    }

    public Category(Integer id, String categoryName, String description)
    {

        _id = id;
        _categoryName = categoryName;
        _description = description;
    }

    public String getCategoryName()
    {
        return _categoryName;
    }

    public void setCategoryName(String aCategoryName)
    {
        _categoryName = aCategoryName;
    }

    public String getDescription()
    {
        return _description;
    }

    public void setDescription(String aDescription)
    {
        _description = aDescription;
    }

    public Integer getId()
    {
        return _id;
    }

    public void setId(Integer aId)
    {
        _id = aId;
    }

    public int hashCode()
    {
        return _id.hashCode();
    }

    public boolean equals(Object obj)
    {

        if (obj == this)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof Category))
            return false;
        return ((Category) obj).getId().equals(_id);
    }

    public void fromJSON(Map object)
    {
        _id = new Integer(((Number)object.get("id")).intValue());
        _categoryName = (String)object.get("categoryName");
        _description = (String)object.get("description");
    }

    public void toJSON(Output out)
    {
        out.addClass(getClass());
        out.add("id", getId());
        out.add("categoryName", getCategoryName());
        out.add("description", getDescription());        
    }

}
