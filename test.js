<h1>About this place <%= place.name %></h1>

<table class="table">

      <thead class="thead-default">

        <tr>

          <th class="th">Property Name</th>

          <th class="th">Address</th>

          <th class="th">Postal Code</th>

        </tr>

      </thead>

      <tbody>

        <% allProperties.forEach(function(property) { %>

          <tr>

            <td><%= property.name %></td>

            <td><%= property.address %></td>

            <td><%= property.postalcode %></td>

            <td><a class="btn btn-default btn-primary" href="/user/property/<%=property._id%>/tenant" role="button">Tenants</a></td>

            <td><form method="GET" action="/user/property/<%=property._id%>/edit">

              <button type="submit" class="btn btn-default btn-warning">Edit</button>

            </form></td>

            <td><form method="POST" action="/user/property/<%=property._id%>?_method=DELETE">

              <button type="submit" class="btn btn-default btn-danger">Delete</button>

              </form></td>

            </tr>

          <% }) %>

      </tbody>

    </table>
