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

import org.mortbay.util.ajax.JSON;

/**
 * @author Nigel Canonizado
 *
 * Apr 19, 2006
 */

public abstract class BaseObject implements Serializable, JSON.Convertible
{

    public abstract boolean equals(Object obj);

    public abstract int hashCode();

}
