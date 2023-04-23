# GeoFriends

## Inspiration
Our team was inspired to create GeoFriends for two main reasons. The first reason was that  recommendations made for travelers are very broad, and as a result, many are not applicable or of interest to the user. For example, food is usually a big part of recommendations, but what if the user has many restrictions or preferences for food? The blog, app or quiz that made the recommendations becomes useless, and searching "Food in {City}" is too overwhelming. It is also much harder to find "hidden gems" or places that are not tourist traps, since those places are publicly shared on the internet for a reason. Our second reason was that we wanted to create an app that was inclusive for all people - since applications for traveling are generally geared towards a much more specific demographic.

## What it does
GeoFriends tracks your and your friends' locations throughout the day, and awards you points for the cumulative amount of area you have explored. The purpose of this is to make this app inclusive for all people - regardless of how often they do 'real traveling'. For those who have the privilege to backpack Europe or go on frequent international trips, they likely have many friends who they have met through their trips that likewise travel frequently. That demographic of users would likely compete on a larger, international scale. However, that does not mean that less frequent travelers are exempt from using this app. If anything, this is the perfect app for them to use to make their everyday life a little more exciting. Taking your dog on a walk? Take a different route. Going out to eat with your family? Opt for a restaurant you haven't been to before. Empty weekend? Make a day trip out of it. People tend to fall into schedules and rhythms over time, including where they choose to eat, the route they walk their dog etc. This would encourage the average everyday person to go out and explore their city and surrounding areas on a frequent, if not, daily basis.
GeoFriends also allows users to receive points for posting photos of places they have gone to, in order to give helpful recommendations to their friends. Recommendations from your friends on where to go, is likely much more tuned to your preferences, as friends usually share mutual likings for food, things to do etc. Therefore, your map would be populated with photos of many things to do that your friends have approved of, making the exploration of your city a little easier. It also helps to have a visual of where you have already explored, as you can simply choose a location you have not visited according to the map that your friends highly recommend as the next place to go.

## How we built it
We built this app using Expo and React Native for our frontend. Enabling natural cross-ecosystem support so you can play with all your friends regardless of the platform they choose. Notable frontend library inclusions are React-Native-Maps and Expo Camera. Giving us support for features usually locked behind native iOS and Android applications. 

GeoFriends uses two backends. Firebase was used for authentication through Google, image management with Cloud Storage for Firebase, and Firestore was used for the rest of our CRUD functionality. Our more technologically novel backend lived on Azure. Azure's managed rational database service, Azure Database for PostgreSQL servers, featuring geospatial and geocoding capabilities from the PostGIS and PostGIS TIGER extensions respectively, were used to store and compute new geometries. A FastAPI Python microservice on a Azure Virtual Machine was used to interface with our PostGIS database and ensure the user was authenticated through Firebase.

## Challenges we ran into
Our largest challenge was the map component. It was extremely challenging to integrate the app, being able to transform it (moving, zooming in/out) and calculate the polygonal areas that people have traveled in. 
We also ran into problems with 

## Accomplishments that we're proud of

## What we learned
Most of our team are inexperienced Hackathoners, so for most of us, it was our first time having a hand in full stack. We each did a little bit of everything.
Jack learned Azure services and workflows as well as React Native.
Daniel learned ___.
Julia learned ___.
Katya learned how to use React Native, Firebase and send API calls using Postgres.

## What's next for GeoFriends
We would like to incorporate dynamic points and area calculations based on how long you were at a place and how far away it is from your home location. So, as you travel away from your set home address, the points and area increase. Within your home city and surrounding areas, the radius would be very small, essentially forcing you to explore everything in order to receive the maximum number of points. Furthermore, the area and points grow depending on how long you were at a place. That way, people who road tripped and drove through 20 states do not earn a disproportional number of points, as they were on the highway for most of it, but they still do get a small portion of points for still exploring a new area. Understandably, this would force users to actually spend time in a new area, rather than driving around the city and getting the maximum number of points in a day. 
Secondly, we would like to incorporate a reviews feature, so that users can share more than photos - including bad experiences. With this, we would also like to include a cool-down feature for leaving a review or photo, or limit it to one a day, so that users do not spam random photos and reviews simply for points. 
