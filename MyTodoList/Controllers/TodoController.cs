using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MyTodoList.Models;

namespace MyTodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static IMemoryCache _cache;
        private readonly string _todoKey = "__todoKey";

        public TodoController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            if (_cache.Get<List<Todo>>(_todoKey) == null)
            {
                _cache.Set<List<Todo>>(_todoKey, new List<Todo>());
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> Get()
        {
            return _cache.Get<List<Todo>>(_todoKey);
        }

        [HttpPost]
        public ActionResult<Todo> Post([FromBody] Todo todo)
        {
            var todos = _cache.Get<List<Todo>>(_todoKey);
            if (todos == null || todos.Count == 0 || !todos.Any(x => x.Id == todo.Id))
            {
                todos.Add(todo);
                _cache.Set<List<Todo>>(_todoKey, todos);
            }

            return todo;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var todos = _cache.Get<List<Todo>>(_todoKey);
            todos.RemoveAll(x => x.Id == id);
            _cache.Set<List<Todo>>(_todoKey, todos);
        }

    }
}