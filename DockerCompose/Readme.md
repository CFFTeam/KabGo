## LƯU Ý KHI SỬ DỤNG DOCKER COMPOSE VOLUME CẦN PHẢI VÀO TỪNG FOLDER CLIENTS, SERVERS VÀ INSTALL PACKAGES NPM HAY NPM INSTALL ĐỂ CÓ THỂ CHẠY.
# Cấu trúc thư mục
Các thư mục cấu hình codebase của các phân hệ nằm ngoài 1 cấp tại thư mục KabGo so với cấp thư mục của **"docker-compose.yml"** hay **"Readme.md"** ( **e.g: ../KabGo/** ) 
- Thư mục client chứa các phân hệ Client: Admin, Call Center.
- Thư mục servers chứa các phân hệ API: Auth, Customer, Driver, Admin, Call Center.

**Chi tiết**:
- khi clone phải clone branch master nằm trong folder KabGo của branch docker-composes.
- Hay Clone branch docker-composes trước rồi vào folder KabGo của branch docker-composes (nơi chứa thư mục DockerCompose) rồi clone tiếp branch master.

**Ví dụ cấu trúc cây:**
- DockerCompose
- KabGo/clients
- KabGo/servers
#
# Hướng dẫn sử dụng
## Cài đặt các hosts cần thiết (Chỉ chạy lần đầu)
Windows: 
- Truy cập vào folder **"hosts/Windows"** chạy file add-entry-hosts.bat với quyền **Administrator**.

MacOS:
- Mở terminal tại thư mục chứa file **"docker-compose.yml"** sau đó sử dụng lệnh truy cập vào folder **"hosts/MacOS"** chạy file add-entry-hosts.sh với quyền **super user**.

```shell
chmod +x ./hosts/MacOS/add-entry-hosts.sh
sudo ./hosts/MacOS/add-entry-hosts.sh
```

Linux:
- Mở terminal tại thư mục chứa file **"docker-compose.yml"** sau đó sử dụng lệnh truy cập vào folder **"hosts/Linux"** chạy file add-entry-hosts.sh với quyền **super user**.

```shell
chmod +x ./hosts/Linux/add-entry-hosts.sh
sudo ./hosts/Linux/add-entry-hosts.sh
```

#
## Build docker compose (Chỉ chạy lần đầu).

Windows: 
```bash
docker-compose up --build
```

MacOS và Linux:
```shell
sudo docker-compose up --build
```
#
## Run docker (Ở những lần sau)
Windows: 
```bash
docker-compose up
```

MacOS và Linux:
```shell
sudo docker-compose up
```

#
## Nếu muốn clean để build lại docker (Lưu ý lệnh này sẽ xóa tất cả các image và container đang có nên cẩn thận sử dụng nếu có các images hay container quan trọng)

Windows: 
```bash
docker system prune -a
```

MacOS và Linux: 
```bash
sudo docker system prune -a
```

Thực hiện build lại docker.