# adad

### Git

cai package

```jsx
yarn add xyz -W // require flag -W
```

run 

```jsx
run mentis

yarn dev:mentis
```

commit 

```jsx
git add .

git commit -m "<message>"
```

sửa một commit đã có

```jsx

git add <file_change> or .

git commit --amend --no-edit  // non edit message

or

git commit --amend -edit // edit message

then

git push --force
```

pull 

```jsx
git pull origin --rebase
```

**nếu xảy ra conflit  —> merge —> git rebase —continue —> git push —force**

### Cấu trúc thư mục

**common (chứa các function dùng chung)**

controllers: controller dùng chung

**interfaces (chứa các interface kiểu dữ liệu, …)**

controller: base controller, tạo controller mới kế thừa từ đây (VD)

```jsx
class UserController implements Controller {
	**path: string = "/user";
	router: Router = Router();**

	constructor() {
		this.router.post("/login", validationMiddleware(LoginDto), this.login);
		this.router.get("/profile", authMiddleware, this.profile);
	}

	private login = (req: Request, res: Response, next: NextFunction) => {
		const token = this.createToken({ name: "admin" });
		res.json({ token });
	};

	private profile = async (req: Request, res: Response, next: NextFunction) => {
		res.send(req.user);
	};

	private createToken = (user: User): string => {
		const expiresIn = 60 * 60;
		const secret = process.env.JWT_SECRET as string;

		return jwt.sign(user, secret, { expiresIn });
	};
}
```

**middlerware**: (middleware dùng trong các controller dùng chung hoặc app)

auth.middleware: authentica 

```jsx
this.router.get("/profile", authMiddleware, this.profile);
```

error.middleware: error hanlder

```jsx
private login = (req: Request, res: Response, next: NextFunction) => {
		// loi gi do
		next(new HttpException(400, "Loi gi do"))
	};
```

validation.middleware: để validate body request 

```jsx
this.router.post("/login", validationMiddleware(LoginDto), this.login);

neu pass validate thi moi goi ham login

define dto coi phan dto
```

**dtos**

chứa các dto dùng chung, để validate request body, ….

doc tại đây [class-validator - npm (npmjs.com)](https://www.npmjs.com/package/class-validator) 

```jsx
import { IsString, IsNotEmpty } from "class-validator";

class LoginDto {
	constructor(obj) {
		Object.assign(this, obj);
	}
	@IsNotEmpty({ message: "Email is required" })
	@IsString({ message: "Email must be a string" })
	public email: string;

	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a string" })
	public password: string;
}

export default LoginDto;
```

**models: model mongo (updating)**

**projects: code mentis trong đây**