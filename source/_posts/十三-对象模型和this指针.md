---
title: 十三.对象模型和this指针
author: 连思鑫
tags:
  - c++
  - this指针
categories:
  - ..
  - C++
  - C++核心编程
  - ''
date: 2026-10-25 18:05:00
---

## 13 对象模型和this指针

* 本章围绕四个知识点展开：成员变量和成员函数分开存储、this 指针、空指针访问成员函数、const 修饰成员函数。
* 每个小节都配有完整可编译的示例代码，建议边看边动手，用 `sizeof` 和编译器的报错信息逐条验证结论。

### 13.1 成员变量和成员函数分开存储

**作用**：弄清楚一个类的对象到底占用多少内存，理解 ==成员变量和成员函数是分开存储的== 这一 C++ 对象模型的基本规则。

**语法**：使用 `sizeof(类名)` 或 `sizeof(对象)` 可以查看对象占用的字节数。存储规则如下：

* **非静态成员变量**：属于类的对象上，每个对象各持有一份，==占用对象空间==。
* **静态成员变量**：不属于类的对象上，所有对象共享一份，==不占对象空间==。
* **非静态成员函数**：不属于类的对象上，所有对象共用同一份函数代码，==不占对象空间==。
* **静态成员函数**：同样不属于类的对象上，==不占对象空间==。

> 注意：**空对象占用 1 个字节**。C++ 编译器会给每个空对象也分配 1 个字节的空间，目的是==区分不同对象占用的内存位置==——每个空对象也应该有独一无二的内存地址；如果空对象占 0 个字节，多个空对象的地址就无法区分了。

**示例**：下面定义四个类，用 sizeof 逐项验证上面的规则：

```c++
#include <iostream>
using namespace std;

// 空类：没有任何成员
class Person01
{
};

// 类中只有非静态成员变量
class Person02
{
	int m_A; // 非静态成员变量，属于对象，占用对象空间
};

// 类中增加一个静态成员变量
class Person03
{
	int m_A; // 非静态成员变量
	static int m_B; // 静态成员变量，不属于对象，不占对象空间
};

int Person03::m_B = 100; // 静态成员变量需要在类外初始化

// 类中再增加成员函数
class Person04
{
	int m_A; // 非静态成员变量
	static int m_B; // 静态成员变量
	void func() {} // 非静态成员函数，不占对象空间
	static void func2() {} // 静态成员函数，同样不占对象空间
};

int main()
{
	// 空对象占用 1 个字节，为了区分不同对象
	cout << "空类 Person01 占用空间：" << sizeof(Person01) << endl;
	// 只有 1 个 int 类型的非静态成员变量，占用 4 个字节
	cout << "类 Person02 占用空间：" << sizeof(Person02) << endl;
	// 静态成员变量 m_B 不占对象空间，结果仍是 4 个字节
	cout << "类 Person03 占用空间：" << sizeof(Person03) << endl;
	// 成员函数不占对象空间，结果仍是 4 个字节
	cout << "类 Person04 占用空间：" << sizeof(Person04) << endl;

	system("pause");
	return 0;
}
```

> 总结：只有**非静态成员变量**占用对象空间；空对象占 1 字节用于区分不同对象的地址；静态成员变量、静态成员函数、非静态成员函数都不占对象空间。

### 13.2 this 指针的概念

**作用**：this 指针是每一个非静态成员函数中隐含的一个指针，==指向被调用的成员函数所属的对象==，即"谁调用函数，this 就指向谁"。

**语法**：this 指针的本质是 `Person* const this` 指针常量——指针的指向不可以修改，指向的数据可以修改。两大用途如下：

* **用途1**：当==形参名和成员变量同名==时，用 `this->成员变量 = 形参` 区分，解决名称冲突，如 `this->age = age;`。
* **用途2**：在类的非静态成员函数中返回对象本身，使用 `return *this;`，可以实现==链式编程==。

**示例**：下面演示 this 解决形参与成员变量的命名冲突，并通过返回 `*this` 实现链式编程：

```c++
#include <iostream>
using namespace std;

class Person
{
public:
	int age; // 成员变量

	// 用途1：构造函数的形参名与成员变量同名，用 this 区分
	Person(int age)
	{
		// this->age 是成员变量，右边的 age 是形参
		this->age = age;
	}

	// 用途2：返回对象本身，返回类型要用引用 Person&
	Person& PersonAddPerson(Person &p)
	{
		this->age += p.age;
		// this 是指向调用对象的指针，*this 就是调用者这个对象本身
		return *this;
	}
};

int main()
{
	Person p1(10);
	Person p2(10);
	Person p3(10);

	// 链式编程：p1 调用函数后返回 p1 本身，可以继续调用
	p1.PersonAddPerson(p2).PersonAddPerson(p3);

	// p1.age = 10 + 10 + 10 = 30
	cout << "p1.age = " << p1.age << endl;

	system("pause");
	return 0;
}
```

> 注意：如果 `PersonAddPerson` 的返回类型写成 `Person`（值返回）而不是 `Person&`（引用返回），第二次调用就作用在返回的==拷贝副本==上，链式累加会失效。==返回对象本身必须用引用方式返回==。

> 提示：构造函数形参名与成员变量同名时，`this->age = age;` 是最常用的写法；若不加 this，`age = age;` 只是形参自己给自己赋值，成员变量并没有被赋值。

### 13.3 空指针访问成员函数

**作用**：弄清楚用空指针调用成员函数时程序的行为，学会必要的==空指针防护==写法。

**语法**：C++ 中==空指针可以调用成员函数==，因为成员函数不存储在对象上，调用时并不依赖具体的对象内存；但如果函数内用到了 this 指针（例如访问成员变量），this 为空程序就会崩溃。防护写法如下：

* 在成员函数开头加 `if (this == NULL) return;`，一旦发现 this 为空就直接返回，避免访问成员变量时崩溃。

**示例**：`showClassName()` 没有用到 this，空指针可以正常调用；`showPersonAge()` 访问了成员变量，函数内部加入了空指针防护：

```c++
#include <iostream>
using namespace std;

class Person
{
public:
	int m_Age; // 成员变量

	void showClassName()
	{
		// 没有使用 this 指针和成员变量，空指针也可以调用
		cout << "这是 Person 类" << endl;
	}

	void showPersonAge()
	{
		// 防护：如果传入的指针为 NULL，直接返回
		if (this == NULL)
		{
			return;
		}
		// 没有上面的防护，这里访问 m_Age 相当于 this->m_Age，程序会崩溃
		cout << "m_Age = " << m_Age << endl;
	}
};

int main()
{
	Person *p = NULL; // 空指针

	// 空指针调用不使用 this 的成员函数，可以正常运行
	p->showClassName();

	// 加了 if (this == NULL) 防护后，函数直接返回，程序不会崩溃
	p->showPersonAge();

	system("pause");
	return 0;
}
```

> 注意：成员函数里访问成员变量 `m_Age`，编译器实际处理的是 `this->m_Age`；只要函数中用到了成员变量，空指针调用就会崩溃，所以==访问成员变量的成员函数建议都加空指针防护==。

### 13.4 const 修饰成员函数

**作用**：用 const 修饰成员函数和对象，防止在函数内部或对象外部==误改不该修改的数据==。

**语法**：成员函数后加 const 称为==常函数==，对象前加 const 称为==常对象==，规则如下：

* **常函数**：`void showPerson() const`，常函数内==不可以修改普通成员变量==。
* **mutable**：成员变量声明时加 mutable 关键字，即使在常函数中==也可以修改==。
* **常对象**：`const Person p`，常对象==只能调用常函数==，不可以调用普通成员函数；常对象不能修改普通成员变量，但可以修改 mutable 成员变量。
* **本质**：this 指针本质是 `Person* const this` 指针常量；常函数的本质是把 this 从 `Person* const` 变成 ==`const Person* const`==，连指向的数据也不允许修改，所以常函数内修改普通成员变量会报错。

**示例**：下面代码演示常函数、mutable 成员变量与常对象的行为：

```c++
#include <iostream>
using namespace std;

class Person
{
public:
	int m_A; // 普通成员变量
	mutable int m_B; // mutable 修饰的成员变量，常函数中也可以修改

	Person()
	{
		m_A = 100;
		m_B = 200;
	}

	// 常函数：成员函数后加 const，本质是 this 由 Person* const 变为 const Person* const
	void showPerson() const
	{
		// m_A = 100; // 错误：常函数内不可以修改普通成员变量
		m_B = 300; // 正确：mutable 修饰的成员变量，常函数中可以修改
		cout << "m_B = " << m_B << endl;
	}

	// 普通成员函数
	void func()
	{
		m_A = 100; // 普通成员函数可以修改成员变量
	}
};

int main()
{
	// 常对象：对象前加 const
	const Person p;

	// p.m_A = 1000; // 错误：常对象不可以修改普通成员变量
	p.m_B = 1000; // 正确：mutable 修饰的成员变量，常对象也可以修改

	// 常对象只能调用常函数
	p.showPerson();
	// p.func(); // 错误：常对象不可以调用普通成员函数

	system("pause");
	return 0;
}
```

> 提示：常对象为什么只能调用常函数？常对象的 this 是 `const Person* const` 类型，只能传给 this 同为 `const Person* const` 的常函数；普通成员函数的 this 是 `Person* const`，类型不匹配，编译器会直接禁止调用。

> 总结：常函数内不能修改普通成员变量，mutable 成员变量是例外；常对象只能调用常函数，mutable 成员变量同样是例外。
