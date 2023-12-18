using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        #region property  
        private readonly MainDbcontext _applicationDbContext;
        private readonly DbSet<T> entities;
        #endregion
       

        #region Constructor
        public Repository(MainDbcontext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }
        #endregion
        public IQueryable<T> QueryableEntities => entities;

        public async Task<bool> Delete(T entity)
        {
            entities.Remove(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<T> Get(int Id)
        {
            return await entities.FindAsync(Id);
        }

        public async Task<ICollection<T>> GetAll()
        {
            return await entities.ToListAsync();
        }

        public async Task<bool> Insert(T entity)
        {
            await entities.AddAsync(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }
      
        public async Task<bool> Update(T entity)
        {
            entities.Update(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }
        public async Task<T> Find(Expression<Func<T, bool>> match)
        {
            return await entities.FirstOrDefaultAsync(match);
        }

        /*   public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
           {
               return await entities.Where(match).ToListAsync();
           }*/
        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = entities.Where(match);

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

    }
}
