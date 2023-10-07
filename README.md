# KabGo
Welcome to KabGo, the revolutionary on-demand transportation platform that brings convenience and efficiency to your everyday commute. With KabGo, we're reshaping the way you travel, providing a seamless experience that's similar to Grab but with some unique features to enhance your journey.

Demo: [Demo](https://ynh33-my.sharepoint.com/:f:/g/personal/giahuy200202_ynh33_onmicrosoft_com/EvloolhqpZdErXaQVtc1tEQBrXCygGFCSr3aKVs_x9fgSQ?e=CpOH3d)

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
