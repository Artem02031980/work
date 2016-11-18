<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {% block title %} {% endblock title %}


    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/import.css" />
    
    {% block styles %} {% endblock styles %}


    <script src="js/lib/jquery.js"></script>
    <script src="js/lib/bootstrap.js"></script>

</head>

<body>
 


    <!-- MAIN CONTENT -->
    <div class="{% block class %} {% endblock class %}">

        {% block content %}  {% endblock content %}

    </div>
    
    {% include "partials/footer.tpl" %} 
    
    {# {% include "partials/comment.tpl" %} #}
 
    <!-- SCRIPTS -->
    {% block scripts %}  {% endblock scripts %}

</body>
</html>