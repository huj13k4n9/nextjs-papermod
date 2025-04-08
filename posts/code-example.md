---
title: 代码语法高亮测试
date: 2025-04-07 00:00:00
---

# 代码语法高亮测试
这个Markdown文件包含了各种主流编程语言和标记语言的代码示例，用于测试语法高亮功能。
## JavaScript
```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}!`;
}
// 箭头函数
const multiply = (a, b) => a * b;
// 类声明
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}
// 异步函数
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```
## TypeScript
```typescript
// 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
}
// 泛型
function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}
// 类型别名
type Point = {
  x: number;
  y: number;
};
// 枚举
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
// 带类型的类
class Product<T> {
  constructor(
    public id: number,
    public name: string,
    public data: T
  ) {}
}
```
## Python
```python
import os
import pandas as pd
from typing import List, Dict, Optional
# 类定义
class DataProcessor:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.data = None
    def load_data(self) -> pd.DataFrame:
        """加载数据文件到DataFrame"""
        self.data = pd.read_csv(self.data_path)
        return self.data
    def process(self, filter_column: Optional[str] = None) -> Dict:
        if self.data is None:
            self.load_data()
        result = {"total_rows": len(self.data)}
        if filter_column and filter_column in self.data.columns:
            result["unique_values"] = self.data[filter_column].nunique()
        return result
# 装饰器
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.2f} seconds to run")
        return result
    return wrapper
@timer
def complex_calculation(n: int) -> List[int]:
    return [i ** 2 for i in range(n) if i % 2 == 0]
```
## Java
```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
public class StreamExample {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Charlie", 35));
        people.add(new Person("Diana", 40));
        // 使用Stream API过滤和映射
        List<String> names = people.stream()
            .filter(person -> person.getAge() > 30)
            .map(Person::getName)
            .collect(Collectors.toList());
        System.out.println("Names of people older than 30: " + names);
    }
    // 内部类
    static class Person {
        private final String name;
        private final int age;
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        public String getName() {
            return name;
        }
        public int getAge() {
            return age;
        }
        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + "}";
        }
    }
}
```
## Go
```go
package main
import (
	"fmt"
	"sync"
	"time"
)
// 结构体定义
type Task struct {
	ID       int
	Name     string
	Completed bool
}
// 方法定义
func (t *Task) Complete() {
	t.Completed = true
}
func (t Task) String() string {
	status := "pending"
	if t.Completed {
		status = "completed"
	}
	return fmt.Sprintf("Task %d: %s [%s]", t.ID, t.Name, status)
}
// 并发函数
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for j := range jobs {
		fmt.Printf("Worker %d started job %d\n", id, j)
		time.Sleep(time.Second) // 模拟工作
		fmt.Printf("Worker %d finished job %d\n", id, j)
		results <- j * 2
	}
}
func main() {
	// 创建任务
	task := Task{ID: 1, Name: "Learn Go", Completed: false}
	task.Complete()
	fmt.Println(task.String())
	// 并发示例
	numJobs := 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)
	var wg sync.WaitGroup
	// 启动3个worker
	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}
	// 发送工作
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)
	// 等待所有worker完成
	wg.Wait()
	close(results)
	// 收集结果
	for r := range results {
		fmt.Println("Result:", r)
	}
}
```
## Rust
```rust
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;
// 结构体定义
#[derive(Debug, Clone)]
struct User {
    id: u64,
    name: String,
    email: String,
}
impl User {
    fn new(id: u64, name: &str, email: &str) -> Self {
        User {
            id,
            name: name.to_string(),
            email: email.to_string(),
        }
    }
    fn display(&self) -> String {
        format!("User {} ({}): {}", self.id, self.name, self.email)
    }
}
// 枚举定义
#[derive(Debug)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quitting"),
        Message::Move { x, y } => println!("Moving to ({}, {})", x, y),
        Message::Write(text) => println!("Writing: {}", text),
        Message::ChangeColor(r, g, b) => println!("Changing color to ({}, {}, {})", r, g, b),
    }
}
fn main() {
    // 创建用户
    let user = User::new(1, "Alice", "alice@example.com");
    println!("{}", user.display());
    // 使用枚举
    let messages = vec![
        Message::Write(String::from("Hello")),
        Message::Move { x: 10, y: 20 },
        Message::ChangeColor(255, 0, 0),
    ];
    for msg in messages {
        process_message(msg);
    }
    // 多线程示例
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
    println!("Final count: {}", *counter.lock().unwrap());
}
```
## C++
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <memory>
// 类定义
class Animal {
protected:
    std::string name;
public:
    Animal(const std::string& name) : name(name) {}
    virtual ~Animal() = default;
    virtual void makeSound() const {
        std::cout << "Animal sound" << std::endl;
    }
    const std::string& getName() const {
        return name;
    }
};
// 继承
class Dog : public Animal {
public:
    Dog(const std::string& name) : Animal(name) {}
    void makeSound() const override {
        std::cout << name << " says: Woof!" << std::endl;
    }
    void fetch() const {
        std::cout << name << " is fetching a ball." << std::endl;
    }
};
// 模板函数
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}
int main() {
    // 智能指针和多态
    std::vector<std::shared_ptr<Animal>> animals;
    animals.push_back(std::make_shared<Animal>("Generic Animal"));
    animals.push_back(std::make_shared<Dog>("Buddy"));
    for (const auto& animal : animals) {
        std::cout << "Name: " << animal->getName() << std::endl;
        animal->makeSound();
    }
    // 容器和算法
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3};
    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    // Lambda表达式
    auto square =  { return x * x; };
    std::cout << "Square of 5: " << square(5) << std::endl;
    return 0;
}
```
## C#
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace SyntaxHighlightDemo
{
    // 接口定义
    public interface ILogger
    {
        void Log(string message);
        void LogError(string message, Exception ex);
    }
    // 类实现接口
    public class ConsoleLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine($"[INFO] {DateTime.Now}: {message}");
        }
        public void LogError(string message, Exception ex)
        {
            Console.WriteLine($"[ERROR] {DateTime.Now}: {message}");
            Console.WriteLine($"Exception: {ex.Message}");
        }
    }
    // 泛型类
    public class Repository<T> where T : class
    {
        private readonly List<T> _items = new List<T>();
        public void Add(T item)
        {
            _items.Add(item);
        }
        public IEnumerable<T> GetAll()
        {
            return _items.AsReadOnly();
        }
        public IEnumerable<T> Find(Func<T, bool> predicate)
        {
            return _items.Where(predicate);
        }
    }
    class Program
    {
        static async Task Main(string[] args)
        {
            ILogger logger = new ConsoleLogger();
            logger.Log("Application started");
            try
            {
                // LINQ示例
                var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
                var evenNumbers = numbers.Where(n => n % 2 == 0)
                                          .Select(n => n * n)
                                          .ToList();
                Console.WriteLine("Squared even numbers:");
                foreach (var num in evenNumbers)
                {
                    Console.WriteLine(num);
                }
                // 异步方法调用
                await ProcessDataAsync();
            }
            catch (Exception ex)
            {
                logger.LogError("An error occurred", ex);
            }
            logger.Log("Application ended");
        }
        static async Task ProcessDataAsync()
        {
            Console.WriteLine("Processing data...");
            await Task.Delay(1000); // 模拟异步操作
            Console.WriteLine("Data processing completed");
        }
    }
}
```
## PHP
```php
<?php
namespace App\Services;
use App\Models\User;
use App\Interfaces\UserRepositoryInterface;
use InvalidArgumentException;
/**
 * 用户服务类
 */
class UserService
{
    private $userRepository;
    /**
     * 构造函数
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * 创建新用户
     *
     * @param array $userData
     * @return User
     * @throws InvalidArgumentException
     */
    public function createUser(array $userData): User
    {
        // 验证输入
        if (empty($userData['email']) || empty($userData['name'])) {
            throw new InvalidArgumentException('Name and email are required');
        }
        // 检查邮箱是否已注册
        if ($this->userRepository->findByEmail($userData['email'])) {
            throw new InvalidArgumentException('Email already registered');
        }
        // 处理密码
        $userData['password'] = password_hash($userData['password'], PASSWORD_DEFAULT);
        // 创建用户
        return $this->userRepository->create($userData);
    }
    /**
     * 用户列表，带分页
     */
    public function listUsers(int $page = 1, int $perPage = 20): array
    {
        $users = $this->userRepository->paginate($page, $perPage);
        $total = $this->userRepository->count();
        return [
            'data' => $users,
            'meta' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'total_pages' => ceil($total / $perPage)
            ]
        ];
    }
}
// 匿名函数和箭头函数
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(function($n) {
    return $n * 2;
}, $numbers);
// PHP 7.4+ 箭头函数
$tripled = array_map(fn($n) => $n * 3, $numbers);
echo "Doubled: " . implode(', ', $doubled) . PHP_EOL;
echo "Tripled: " . implode(', ', $tripled) . PHP_EOL;
?>
```
## Ruby
```ruby
require 'json'
require 'date'
# 模块定义
module Loggable
  def log(message)
    puts "[#{Time.now}] #{self.class.name}: #{message}"
  end
end
# 类定义
class Post
  include Loggable
  attr_accessor :title, :content, :published_at
  def initialize(title, content)
    @title = title
    @content = content
    @published_at = nil
    log "Created new post: #{title}"
  end
  def publish
    @published_at = Time.now
    log "Published post: #{title}"
  end
  def to_json
    {
      title: @title,
      content: @content,
      published_at: @published_at
    }.to_json
  end
end
# 继承
class FeaturedPost < Post
  attr_accessor :featured_until
  def initialize(title, content, featured_days)
    super(title, content)
    @featured_until = Time.now + (featured_days * 24 * 60 * 60)
    log "Post will be featured until #{@featured_until}"
  end
  def publish
    super
    log "Published as featured post!"
  end
end
# 使用示例
post = Post.new("Regular Post", "This is a regular post content")
post.publish
puts post.to_json
featured = FeaturedPost.new("Featured Post", "This is a featured post content", 7)
featured.publish
puts featured.to_json
# 块和lambda
squares = [1, 2, 3, 4, 5].map { |n| n * n }
puts "Squares: #{squares.join(', ')}"
greeting = -> (name) { "Hello, #{name}!" }
puts greeting.call("Ruby")
# Symbol to proc
numbers = [1, 2, 3, 4, 5]
puts "Sum: #{numbers.reduce(&:+)}"
```
## Swift
```swift
import Foundation
// 协议定义
protocol Vehicle {
    var name: String { get }
    var maxSpeed: Double { get }
    func start()
    func stop()
}
// 扩展协议
extension Vehicle {
    func describe() -> String {
        return "Vehicle: \(name), Max Speed: \(maxSpeed) km/h"
    }
}
// 结构体实现协议
struct Bicycle: Vehicle {
    let name: String
    let maxSpeed: Double
    func start() {
        print("\(name) is now moving")
    }
    func stop() {
        print("\(name) has stopped")
    }
}
// 类实现协议
class Car: Vehicle {
    let name: String
    let maxSpeed: Double
    private var isRunning = false
    init(name: String, maxSpeed: Double) {
        self.name = name
        self.maxSpeed = maxSpeed
    }
    func start() {
        isRunning = true
        print("\(name) engine started")
    }
    func stop() {
        isRunning = false
        print("\(name) engine stopped")
    }
    func honk() {
        print("\(name) honks: Beep beep!")
    }
}
// 泛型函数
func printArray<T>(_ array: [T]) {
    print("Array contents:")
    for item in array {
        print("- \(item)")
    }
}
// 错误处理
enum DatabaseError: Error {
    case connectionFailed
    case queryFailed(reason: String)
    case insufficientPermissions
}
func fetchUserData(id: Int) throws -> [String: Any] {
    // 模拟数据库操作
    let random = Int.random(in: 1...10)
    if random < 3 {
        throw DatabaseError.connectionFailed
    } else if random < 5 {
        throw DatabaseError.queryFailed(reason: "Invalid user ID")
    }
    return [
        "id": id,
        "name": "User \(id)",
        "email": "user\(id)@example.com"
    ]
}
// 主程序
let bicycle = Bicycle(name: "Mountain Bike", maxSpeed: 30.0)
let car = Car(name: "Tesla Model 3", maxSpeed: 220.0)
bicycle.start()
car.start()
car.honk()
print(bicycle.describe())
print(car.describe())
let vehicles: [Vehicle] = [bicycle, car]
printArray(vehicles)
// 使用可选值
let possibleNumber = "123"
if let number = Int(possibleNumber) {
    print("The string \"\(possibleNumber)\" has an integer value of \(number)")
} else {
    print("The string \"\(possibleNumber)\" couldn't be converted to an integer")
}
// 错误处理
do {
    let userData = try fetchUserData(id: 42)
    print("User data: \(userData)")
} catch DatabaseError.connectionFailed {
    print("Error: Could not connect to database")
} catch DatabaseError.queryFailed(let reason) {
    print("Error: Query failed - \(reason)")
} catch {
    print("Unexpected error: \(error)")
}
```
## Kotlin
```kotlin
package com.example.demo
import kotlinx.coroutines.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
// 数据类
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val createdAt: LocalDateTime = LocalDateTime.now()
)
// 接口定义
interface UserRepository {
    suspend fun findById(id: Int): User?
    suspend fun findAll(): List<User>
    suspend fun save(user: User): User
    suspend fun delete(id: Int): Boolean
}
// 实现类
class InMemoryUserRepository : UserRepository {
    private val users = mutableMapOf<Int, User>()
    override suspend fun findById(id: Int): User? {
        delay(100) // 模拟网络/数据库延迟
        return users[id]
    }
    override suspend fun findAll(): List<User> {
        delay(200) // 模拟网络/数据库延迟
        return users.values.toList()
    }
    override suspend fun save(user: User): User {
        delay(150) // 模拟网络/数据库延迟
        users[user.id] = user
        return user
    }
    override suspend fun delete(id: Int): Boolean {
        delay(100) // 模拟网络/数据库延迟
        return users.remove(id) != null
    }
}
// 扩展函数
fun User.formattedCreationDate(): String {
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
    return createdAt.format(formatter)
}
// 密封类
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val cause: Throwable? = null) : Result<Nothing>()
    object Loading : Result<Nothing>()
}
// 协程函数
suspend fun fetchUsers(repository: UserRepository): Result<List<User>> {
    return try {
        val users = repository.findAll()
        Result.Success(users)
    } catch (e: Exception) {
        Result.Error("Failed to fetch users", e)
    }
}
fun main() = runBlocking {
    val userRepository = InMemoryUserRepository()
    // 创建用户
    val users = listOf(
        User(1, "Alice", "alice@example.com"),
        User(2, "Bob", "bob@example.com"),
        User(3, "Charlie", "charlie@example.com")
    )
    // 保存用户
    users.forEach { user ->
        userRepository.save(user)
        println("Saved user: ${user.name}")
    }
    // 并行获取用户
    val jobs = users.map { user ->
        async {
            val fetchedUser = userRepository.findById(user.id)
            fetchedUser?.let {
                println("User ${it.id}: ${it.name} (created: ${it.formattedCreationDate()})")
            }
        }
    }
    jobs.awaitAll()
    // 使用高阶函数
    val result = fetchUsers(userRepository)
    when (result) {
        is Result.Success -> {
            println("Successfully fetched ${result.data.size} users")
            // 使用集合操作
            val filteredUsers = result.data
                .filter { it.email.endsWith("example.com") }
                .sortedBy { it.name }
                .map { "${it.name} (${it.email})" }
            println("Filtered users:")
            filteredUsers.forEach { println("- $it") }
        }
        is Result.Error -> println("Error: ${result.message}")
        is Result.Loading -> println("Loading...")
    }
}
```
## HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Syntax Highlighting Example</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-title {
            margin-top: 0;
            color: #0066cc;
        }
        form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #0066cc;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0052a3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        table th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <header>
        <h1>HTML Syntax Highlighting Demo</h1>
        <nav>
            <ul>
                <li><a href="#form-section">Forms</a></li>
                <li><a href="#table-section">Tables</a></li>
                <li><a href="#semantic-section">Semantic Elements</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <section id="form-section" class="card">
            <h2 class="card-title">Form Elements</h2>
            <form action="/submit" method="post">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter your name">
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email">
                </div>
                <div>
                    <label for="category">Category:</label>
                    <select id="category" name="category">
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                    </select>
                </div>
                <div>
                    <label>Preferences:</label>
                    <label>
                        <input type="checkbox" name="preferences" value="newsletter"> Subscribe to newsletter
                    </label>
                    <label>
                        <input type="checkbox" name="preferences" value="updates"> Receive product updates
                    </label>
                </div>
                <div>
                    <label>Experience Level:</label>
                    <label>
                        <input type="radio" name="experience" value="beginner"> Beginner
                    </label>
                    <label>
                        <input type="radio" name="experience" value="intermediate"> Intermediate
                    </label>
                    <label>
                        <input type="radio" name="experience" value="advanced"> Advanced
                    </label>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="4" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </section>
        <section id="table-section" class="card">
            <h2 class="card-title">Table Example</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td>Inactive</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Bob Johnson</td>
                        <td>bob@example.com</td>
                        <td>Active</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Total Users</td>
                        <td>3</td>
                    </tr>
                </tfoot>
            </table>
        </section>
        <section id="semantic-section" class="card">
            <h2 class="card-title">Semantic Elements</h2>
            <article>
                <h3>Article Title</h3>
                <p>This is a paragraph inside an article element. The <code>&lt;article&gt;</code> element represents a self-contained composition in a document, which is intended to be independently distributable or reusable.</p>
                <figure>
                    <img src="https://via.placeholder.com/400x200" alt="Placeholder image">
                    <figcaption>Figure caption example</figcaption>
                </figure>
            </article>
            <aside>
                <h3>Related Information</h3>
                <p>This is an aside element. The <code>&lt;aside&gt;</code> element represents a section of a page that consists of content that is tangentially related to the content around it.</p>
            </aside>
            <details>
                <summary>Click to show more information</summary>
                <p>This is additional information that is hidden by default using the <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements.</p>
            </details>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 HTML Syntax Highlighting Demo</p>
        <address>
            Contact: <a href="mailto:info@example.com">info@example.com</a>
        </address>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Page loaded');
        });
    </script>
</body>
</html>
```
## CSS
```css
/* Variables and root styles */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --dark-color: #2c3e50;
  --light-color: #ecf0f1;
  --text-color: #333333;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --transition-speed: 0.3s;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: var(--font-family);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-color);
  margin: 0;
  padding: 0;
}
/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: var(--dark-color);
}
h1 {
  font-size: 2.5rem;
  font-weight: 700;
}
h2 {
  font-size: 2rem;
  font-weight: 600;
}
p {
  margin-bottom: calc(var(--spacing-unit) * 2);
}
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-speed) ease;
}
a:hover {
  color: darken(var(--primary-color), 15%);
  text-decoration: underline;
}
/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: calc(var(--spacing-unit) * 2);
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(var(--spacing-unit) * -1);
}
.col {
  flex: 1;
  padding: 0 var(--spacing-unit);
}
/* Media queries */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
}
/* Header styles */
.header {
  background-color: var(--dark-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  display: flex;
  list-style: none;
}
.nav-links li {
  margin-left: calc(var(--spacing-unit) * 2);
}
.nav-links a {
  color: white;
}
/* Card component */
.card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 3);
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 1.5rem;
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: var(--primary-color);
}
/* Button styles */
.btn {
  display: inline-block;
  padding: calc(var(--spacing-unit)) calc(var(--spacing-unit) * 2);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
  transition: background-color var(--transition-speed) ease;
}
.btn:hover {
  background-color: darken(var(--primary-color), 10%);
}
.btn-secondary {
  background-color: var(--secondary-color);
}
.btn-secondary:hover {
  background-color: darken(var(--secondary-color), 10%);
}
/* Form elements */
.form-group {
  margin-bottom: calc(var(--spacing-unit) * 2);
}
.form-control {
  display: block;
  width: 100%;
  padding: calc(var(--spacing-unit));
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-color);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  transition: border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}
.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
}
label {
  display: inline-block;
  margin-bottom: calc(var(--spacing-unit));
  font-weight: 600;
}
/* Utilities */
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.mt-1 { margin-top: calc(var(--spacing-unit)); }
.mt-2 { margin-top: calc(var(--spacing-unit) * 2); }
.mt-3 { margin-top: calc(var(--spacing-unit) * 3); }
.mt-4 { margin-top: calc(var(--spacing-unit) * 4); }
.mb-1 { margin-bottom: calc(var(--spacing-unit)); }
.mb-2 { margin-bottom: calc(var(--spacing-unit) * 2); }
.mb-3 { margin-bottom: calc(var(--spacing-unit) * 3); }
.mb-4 { margin-bottom: calc(var(--spacing-unit) * 4); }
/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
/* Advanced selectors */
.card > :first-child {
  margin-top: 0;
}
.card > :last-child {
  margin-bottom: 0;
}
input[type="checkbox"],
input[type="radio"] {
  margin-right: calc(var(--spacing-unit));
}
a:not([class]) {
  text-decoration: underline;
}
/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: calc(var(--spacing-unit) * 3);
}
/* Footer */
.footer {
  background-color: var(--dark-color);
  color: white;
  padding: calc(var(--spacing-unit) * 3) 0;
  margin-top: calc(var(--spacing-unit) * 5);
}
/* Responsive images */
img {
  max-width: 100%;
  height: auto;
}
```
## SQL
```sql
-- 创建数据库
CREATE DATABASE blog_system;
-- 使用数据库
USE blog_system;
-- 创建用户表
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    profile_image VARCHAR(255),
    role ENUM('admin', 'editor', 'author', 'subscriber') DEFAULT 'subscriber',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);
-- 创建文章分类表
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(category_id) ON DELETE SET NULL
);
-- 创建文章表
CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    author_id INT NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    comment_status ENUM('open', 'closed') DEFAULT 'open',
    view_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_author (author_id),
    INDEX idx_status (status),
    FULLTEXT INDEX idx_search (title, content)
);
-- 创建文章和分类关联表
CREATE TABLE post_categories (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);
-- 创建标签表
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
-- 创建文章和标签关联表
CREATE TABLE post_tags (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);
-- 创建评论表
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    parent_id INT NULL,
    author_name VARCHAR(50) NOT NULL,
    author_email VARCHAR(100) NOT NULL,
    author_url VARCHAR(255),
    author_ip VARCHAR(100),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(comment_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_post (post_id)
);
-- 插入示例数据
INSERT INTO users (username, email, password_hash, first_name, last_name, role)
VALUES 
('admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin'),
('john_doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'author'),
('jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', 'editor');
INSERT INTO categories (name, slug, description)
VALUES 
('Technology', 'technology', 'Technology related articles'),
('Travel', 'travel', 'Travel guides and tips'),
('Food', 'food', 'Recipes and food reviews'),
('Health', 'health', 'Health and wellness tips');
-- 创建存储过程：获取特定分类下的所有文章
DELIMITER //
CREATE PROCEDURE get_posts_by_category(IN category_slug VARCHAR(50), IN limit_count INT)
BEGIN
    SELECT p.post_id, p.title, p.slug, p.excerpt, p.featured_image, 
           p.view_count, p.published_at, u.username as author_name
    FROM posts p
    JOIN post_categories pc ON p.post_id = pc.post_id
    JOIN categories c ON pc.category_id = c.category_id
    JOIN users u ON p.author_id = u.user_id
    WHERE c.slug = category_slug
    AND p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT limit_count;
END //
DELIMITER ;
-- 创建视图：热门文章
CREATE VIEW popular_posts AS
SELECT 
    p.post_id,
    p.title,
    p.slug,
    p.excerpt,
    p.view_count,
    p.published_at,
    u.username as author_name,
    COUNT(c.comment_id) as comment_count
FROM posts p
JOIN users u ON p.author_id = u.user_id
LEFT JOIN comments c ON p.post_id = c.post_id AND c.is_approved = TRUE
WHERE p.status = 'published'
GROUP BY p.post_id
ORDER BY p.view_count DESC, comment_count DESC;
-- 创建触发器：当发布文章时更新发布日期
DELIMITER //
CREATE TRIGGER before_post_publish
BEFORE UPDATE ON posts
FOR EACH ROW
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        SET NEW.published_at = CURRENT_TIMESTAMP;
    END IF;
END //
DELIMITER ;
-- 复杂查询：获取每个作者的文章统计和评论数量
SELECT 
    u.user_id,
    u.username,
    COUNT(DISTINCT p.post_id) as post_count,
    SUM(p.view_count) as total_views,
    COUNT(DISTINCT c.comment_id) as comment_count,
    MAX(p.published_at) as last_published_date
FROM users u
LEFT JOIN posts p ON u.user_id = p.author_id AND p.status = 'published'
LEFT JOIN comments c ON p.post_id = c.post_id AND c.is_approved = TRUE
GROUP BY u.user_id
HAVING post_count > 0
ORDER BY total_views DESC;
```
## JSON
```json
{
  "app": {
    "name": "Example API",
    "version": "1.0.0",
    "description": "A complex JSON configuration example",
    "environment": "production",
    "debug": false
  },
  "database": {
    "main": {
      "driver": "postgres",
      "host": "db.example.com",
      "port": 5432,
      "name": "main_db",
      "user": "db_user",
      "password": "password123",
      "pool": {
        "min": 5,
        "max": 20,
        "idle_timeout": 10000
      },
      "ssl": true
    },
    "replica": {
      "driver": "postgres",
      "host": "replica.example.com",
      "port": 5432,
      "name": "replica_db",
      "user": "readonly_user",
      "password": "password456",
      "pool": {
        "min": 2,
        "max": 10,
        "idle_timeout": 10000
      },
      "ssl": true
    }
  },
  "cache": {
    "driver": "redis",
    "host": "cache.example.com",
    "port": 6379,
    "ttl": 3600,
    "options": {
      "cluster": true,
      "nodes": [
        {"host": "cache1.example.com", "port": 6379},
        {"host": "cache2.example.com", "port": 6379},
        {"host": "cache3.example.com", "port": 6379}
      ]
    }
  },
  "server": {
    "port": 3000,
    "host": "0.0.0.0",
    "timeout": 30000,
    "cors": {
      "enabled": true,
      "origins": ["https://example.com", "https://admin.example.com"],
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH"],
      "headers": ["Content-Type", "Authorization", "X-Requested-With"]
    },
    "rate_limit": {
      "enabled": true,
      "max": 100,
      "window_ms": 60000
    }
  },
  "auth": {
    "jwt": {
      "secret": "very-secret-key-should-not-be-in-config",
      "expiration": 86400,
      "refresh_expiration": 604800
    },
    "oauth": {
      "providers": [
        {
          "name": "google",
          "client_id": "google-client-id",
          "client_secret": "google-client-secret",
          "callback_url": "https://api.example.com/auth/google/callback"
        },
        {
          "name": "github",
          "client_id": "github-client-id",
          "client_secret": "github-client-secret",
          "callback_url": "https://api.example.com/auth/github/callback"
        }
      ]
    }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "transports": [
      {
        "type": "console",
        "colorize": true
      },
      {
        "type": "file",
        "filename": "/var/log/app.log",
        "max_size": "10m",
        "max_files": 5
      },
      {
        "type": "elasticsearch",
        "host": "elk.example.com",
        "port": 9200,
        "index": "app-logs"
      }
    ]
  },
  "notification": {
    "email": {
      "provider": "sendgrid",
      "api_key": "sendgrid-api-key",
      "from": "notifications@example.com",
      "templates": {
        "welcome": "d-welcome-template-id",
        "password_reset": "d-password-reset-template-id",
        "invoice": "d-invoice-template-id"
      }
    },
    "sms": {
      "provider": "twilio",
      "account_sid": "twilio-account-sid",
      "auth_token": "twilio-auth-token",
      "from": "+15551234567"
    },
    "push": {
      "provider": "firebase",
      "credentials": {
        "type": "service_account",
        "project_id": "example-app",
        "private_key_id": "private-key-id",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEpQIBAAKCAQEA...\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk@example-app.iam.gserviceaccount.com",
        "client_id": "client-id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40example-app.iam.gserviceaccount.com"
      }
    }
  },
  "features": {
    "user_registration": true,
    "social_login": true,
    "two_factor_auth": true,
    "file_uploads": {
      "enabled": true,
      "max_size": 10485760,
      "allowed_types": ["image/jpeg", "image/png", "application/pdf"]
    },
    "subscription": {
      "enabled": true,
      "plans": [
        {
          "id": "basic",
          "name": "Basic Plan",
          "price": 9.99,
          "currency": "USD",
          "interval": "month",
          "features": ["feature1", "feature2"]
        },
        {
          "id": "premium",
          "name": "Premium Plan",
          "price": 19.99,
          "currency": "USD",
          "interval": "month",
          "features": ["feature1", "feature2", "feature3", "feature4"]
        }
      ]
    }
  }
}
```
## YAML
```yaml
# Application configuration
app:
  name: Example Application
  version: 1.0.0
  description: A comprehensive YAML example for syntax highlighting
  environment: production
  debug: false
  maintainers:
    - name: John Doe
      email: john@example.com
      role: Lead Developer
    - name: Jane Smith
      email: jane@example.com
      role: DevOps Engineer
# Database configuration
database:
  primary:
    host: db.example.com
    port: 5432
    name: app_db
    username: ${DB_USER}  # Environment variable
    password: ${DB_PASSWORD}  # Environment variable
    options:
      pool_size: 20
      timeout: 30000
      ssl: true
  replica:
    - host: replica1.example.com
      port: 5432
      name: app_db
      read_only: true
    - host: replica2.example.com
      port: 5432
      name: app_db
      read_only: true
# Server configuration
server:
  port: 8080
  host: 0.0.0.0
  base_url: https://api.example.com
  cors:
    enabled: true
    origins:
      - https://example.com
      - https://admin.example.com
    methods: [GET, POST, PUT, DELETE, PATCH]
  rate_limiting:
    enabled: true
    max_requests: 100
    time_window: 60  # in seconds
  middleware:
    - name: compression
      enabled: true
      level: 6
    - name: security_headers
      enabled: true
      config:
        hsts: true
        content_security_policy: "default-src 'self'"
    - name: request_logging
      enabled: true
      exclude_paths:
        - /health
        - /metrics
# Authentication
auth:
  jwt:
    secret: ${JWT_SECRET}
    expiration: 3600  # in seconds
    refresh_expiration: 604800  # in seconds
  oauth:
    enabled: true
    providers:
      google:
        client_id: ${GOOGLE_CLIENT_ID}
        client_secret: ${GOOGLE_CLIENT_SECRET}
        callback_url: https://api.example.com/auth/google/callback
        scopes: [email, profile]
      github:
        client_id: ${GITHUB_CLIENT_ID}
        client_secret: ${GITHUB_CLIENT_SECRET}
        callback_url: https://api.example.com/auth/github/callback
        scopes: [user:email]
# Logging configuration
logging:
  level: info  # debug, info, warn, error, fatal
  format: json
  output:
    console:
      enabled: true
      color: true
    file:
      enabled: true
      path: /var/log/app.log
      rotation:
        max_size: 10  # MB
        max_files: 5
    remote:
      enabled: true
      type: elasticsearch
      url: http://elk.example.com:9200
      index: app_logs
# Services
services:
  email:
    provider: sendgrid
    api_key: ${SENDGRID_API_KEY}
    from:
      email: notifications@example.com
      name: Example App
    templates:
      welcome: d-xyz123
      password_reset: d-abc456
      invoice: d-def789
  storage:
    provider: s3
    region: us-west-2
    bucket: app-files
    access_key: ${AWS_ACCESS_KEY}
    secret_key: ${AWS_SECRET_KEY}
    public_url: https://files.example.com
  cache:
    provider: redis
    url: redis://cache.example.com:6379
    password: ${REDIS_PASSWORD}
    ttl: 3600  # in seconds
# Feature flags
features:
  user_registration: true
  two_factor_auth: true
  social_sharing: false
  advanced_analytics:
    enabled: true
    sampling_rate: 0.1
# API endpoints
api:
  versions:
    - name: v1
      status: stable
      deprecated: false
    - name: v2
      status: beta
      deprecated: false
    - name: v3
      status: alpha
      deprecated: false
  rate_limits:
    default: 100  # requests per minute
    authenticated: 300  # requests per minute
    paths:
      "/api/v1/users":
        GET: 200
        POST: 50
      "/api/v1/uploads":
        POST: 10
# Deployment configuration
deployment:
  strategy: rolling
  replicas: 3
  resources:
    limits:
      cpu: 1
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi
  health_check:
    path: /health
    port: 8080
    initial_delay: 10
    period: 30
    timeout: 5
    success_threshold: 1
    failure_threshold: 3
  environment_variables:
    NODE_ENV: production
    TZ: UTC
  secrets:
    - name: database-credentials
      mount_path: /etc/app/db
    - name: api-keys
      mount_path: /etc/app/api-keys
# Monitoring
monitoring:
  prometheus:
    enabled: true
    endpoint: /metrics
    scrape_interval: 15s
  alerting:
    enabled: true
    providers:
      - type: slack
        webhook: ${SLACK_WEBHOOK_URL}
        channel: "#alerts"
      - type: pagerduty
        service_key: ${PAGERDUTY_KEY}
  dashboards:
    grafana:
      url: https://grafana.example.com
      folder: app-dashboards
      dashboards:
        - name: Overview
          id: app-overview
        - name: Performance
          id: app-performance
```
## Markdown
```markdown
# Markdown Syntax Demo
This document demonstrates various Markdown syntax elements.
## Headers
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
## Emphasis
*This text is italicized*
_This text is also italicized_
**This text is bold**
__This text is also bold__
***This text is bold and italicized***
___This text is also bold and italicized___
~~This text has strikethrough~~
## Lists
### Unordered Lists
* Item 1
* Item 2
  * Subitem 2.1
  * Subitem 2.2
* Item 3
- Alternative item 1
- Alternative item 2
  - Alternative subitem 2.1
  - Alternative subitem 2.2
- Alternative item 3
### Ordered Lists
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item
## Links
[Inline Link](https://www.example.com)
[Link with Title](https://www.example.com "Example Website")
[Reference Link][reference]
[Reference]: https://www.example.com "Example Reference"
<https://www.example.com> - Automatic URL linking
## Blockquotes
> This is a blockquote.
>
> This is the second paragraph in the blockquote.
>
>> This is a nested blockquote.
## Code
Inline code: `var example = true;`
```javascript
// Code block with syntax highlighting
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));
```