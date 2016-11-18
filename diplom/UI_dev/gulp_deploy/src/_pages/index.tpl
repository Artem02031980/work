<!-- index.tpl -->

<!-- template -->
{% extends "regular.tpl" %}



{% block title %}

    <title>Главная</title>

{% endblock title %}



<!-- class for page wrapper -->

{% block class %} mainpage-wrapper {% endblock class %}


{% block content %}


<!-- MAIN CONTENT start -->
 

<div class="container">
    <div class="row">
        <div class="col-md-4">
           <div class="greetings">
               <h1>Hello world!</h1>
           </div>
        </div>
        <div class="col-md-8">
            <img src="images/pic.jpg" alt="">
        </div>
    </div>
</div>


<!-- MAIN CONTENT end -->

{% endblock %}

{% block scripts %} 

<script>
    console.log("Hello!");
</script>
   
{% endblock %}
