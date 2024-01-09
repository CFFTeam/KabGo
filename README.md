# KabGo
Welcome to KabGo, the revolutionary on-demand transportation platform that brings convenience and efficiency to your everyday commute. With KabGo, we're reshaping the way you travel, providing a seamless experience that's similar to Grab but with some unique features to enhance your journey.

Demo: [Demo](https://l.facebook.com/l.php?u=https%3A%2F%2Fynh33-my.sharepoint.com%2F%3Af%3A%2Fg%2Fpersonal%2Fgiahuy200202_ynh33_onmicrosoft_com%2FEvwLdY8hkrJMsF8cVDSyLjIBu4gIdVUjJd-lKeNk0Gjjag%3Fe%3DNAfyDH%26fbclid%3DIwAR1eafYFO2N5j5EFU31ZlCT-RoaqyWFV04QCXm2h2Mu3F8s7voz833h19Fg&h=AT0MSyKid3jMbysK6SIbZ3tJS3R1Ds85Cw1LFAFMEReCdOMqM_caVOe0vPi4BwOO8RGfU9DaSuIeDWl14LIBcp94EA6Lqw8JIUGW0acQrZFJmbkzZmlLQTdsF4XLi19Dtda2cg)

microservices url:

Clients:
- admin-client: http://admin.kabgo.local
- call-center-client: http://call-center.kabgo.local

Servers:
- admin-api: http://api.admin.kabgo.local
- auth-api: http://api.auth.kabgo.local
- driver-api: http://api.driver.kabgo.local
- customer-api: http://api.customer.kabgo.local
- call-center-api: http://api.call-center.kabgo.local

RabbitMQ:
- rabbit-management: http://rabbitmq.kabgo.local

How to use: In docker-composes branch -> Readme.md


Git workings:
```bash
    - Commit and push a new code in working branch. (eg: git add . | git commit -m "..." | git push -u origin working branch) (1)
    - Checkout to master branch. (eg: git checkout master) (2)
    - Pull master into local master branch. (eg: git pull origin master) (3)
    - Git merge master into working branch. (eg: git merge master) (4)
    - Fix a conflict (if available) then commit. (eg: git add . | git commit -m "...") (5)
    - Push into working branch. (eg: git push origin working branch) (6)
    - Checkout master branch. (eg: git checkout master) (7)
    - Merge working branch into master branch. (eg: git merge working branch) (8)
    - If conflict then abort merge. (eg: git merge --abort) then checkout to working branch (eg: git checkout working branch) and do again from step 2 to step 8.
```
