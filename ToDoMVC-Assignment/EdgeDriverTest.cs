using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;

namespace inlamning3
{
    [TestClass]
    public class EdgeDriverTest
    {
        private const string edgeDriverDirectory = @"C:\Users\testar\Downloads\edgedriver_win64";
        private EdgeDriver browser;


        [TestInitialize]
        public void EdgeDriverInitialize()
        {
            browser = new EdgeDriver(edgeDriverDirectory);
        }

        [TestMethod]
        public void ExampleTest()
        {
            browser.Url = "https://elin-sjo.github.io/TodoMVC_Elin_Anton/";
            Assert.AreEqual("Backbone.js • TodoMVC", browser.Title);
        }

        [TestMethod]
        public void DisplayOneTodo()
        {
            browser.Url = "https://elin-sjo.github.io/TodoMVC_Elin_Anton/";
            var todoInput = browser.FindElementByCssSelector("[id='inputTodo']");
            todoInput.SendKeys("   Hello           Hello        ");
            todoInput.SendKeys(Keys.Enter);
            var todoOutput = browser.FindElementByCssSelector("[id='input']");
            Assert.AreEqual("Hello Hello", todoOutput.Text);
        }
        [TestMethod]
        public void CheckedTodo()
        {
            browser.Url = "https://elin-sjo.github.io/TodoMVC_Elin_Anton/";
            var todoInput = browser.FindElementByCssSelector("[id='inputTodo']");
            todoInput.SendKeys("hi");
            todoInput.SendKeys(Keys.Enter);
            var itemsLeft = browser.FindElementByCssSelector("[id='itemsLeft']");
            Assert.AreEqual("1 items left", itemsLeft.Text);
            var checkbox = browser.FindElementByCssSelector("[id = 'checkbox']");
            checkbox.Click();
            Assert.AreEqual("0 items left", itemsLeft.Text);

        }
     [TestMethod]
        public void CheckOneOfThree()
        {
            browser.Url = "https://elin-sjo.github.io/TodoMVC_Elin_Anton/";
            var todoInput = browser.FindElementByCssSelector("[id='inputTodo']");
            todoInput.SendKeys("hi");
            todoInput.SendKeys(Keys.Enter);
            todoInput.SendKeys("hello");
            todoInput.SendKeys(Keys.Enter);
            todoInput.SendKeys("hola");
            todoInput.SendKeys(Keys.Enter);
            var itemsLeft = browser.FindElementByCssSelector("[id='itemsLeft']");
            var checkbox = browser.FindElementByCssSelector("[id = 'checkbox']");
            checkbox.Click();
            Assert.AreEqual("2 items left", itemsLeft.Text);
        }

        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browser.Quit();
        }
    }
}
