# KabGo
Welcome to KabGo, the revolutionary on-demand transportation platform that brings convenience and efficiency to your everyday commute. With KabGo, we're reshaping the way you travel, providing a seamless experience that's similar to Grab but with some unique features to enhance your journey.

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

How to use: In docker-composes branch -> Readme.md


Git workings:
```bash
    - Commit and push a new code in working branch. (eg: git add . | git commit -m "..." | git push -u origin working branch) (1)
    - Pull master into local master branch. (eg: git pull origin master) (2)
    - Git merge master into working branch. (eg: git merge master) (3)
    - Fix a conflict (if available) then commit. (eg: git add . | git commit -m "...") (4)
    - Push into working branch. (eg: git push origin working branch) (5)
    - Checkout master branch. (eg: git checkout master) (6)
    - Merge working branch into master branch. (eg: git merge working branch) (7)
    - If conflict then abort merge. (eg: git merge --abort) then checkout to working branch (eg: git checkout working branch) and do again from step 2 to step 7.
```