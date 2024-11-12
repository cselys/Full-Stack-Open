const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'EndtoEnd Test',
        username: 'E2EUser',
        password: 'E2Epass'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'observer',
        username: 'E2EObserver',
        password: 'E2EObserverpass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('E2EUser')
      await page.locator('input[type="password"]').fill('E2Epass') 
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('user')
      await page.locator('input[type="password"]').fill('wrong') 
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
    
    //run with :  npx playwright test --workers=1
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
        await page.locator('input[type="text"]').fill('E2EUser')
        await page.locator('input[type="password"]').fill('E2Epass') 
        await page.getByRole('button', { name: 'login' }).click()
      })
    
      test('a new blog can be created and liked', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('write title here').fill('E2EUser Blog Title')
        await page.getByPlaceholder('write author here').fill('Blog Author')
        await page.getByPlaceholder('write url here').fill('http://E2EUser')
        await page.getByRole('button', { name: 'create'}).click();
  
        await expect(page.getByText('E2EUser Blog Title (Author: Blog Author')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        //test like button
        await expect(page.getByText('likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()  
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        //verify another user doesn't see remove
        await page.getByRole('button', { name: 'logout'}).click()
        await page.goto('http://localhost:5173')
        await page.locator('input[type="text"]').fill('E2EObserver')
        await page.locator('input[type="password"]').fill('E2EObserverpass') 
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes:')).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

        //delete item
        await page.getByRole('button', { name: 'logout'}).click()
        await page.goto('http://localhost:5173')
        await page.locator('input[type="text"]').fill('E2EUser')
        await page.locator('input[type="password"]').fill('E2Epass') 
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        page.on('dialog', async (dialog) => {
          if (dialog.type() === 'confirm') {
            await dialog.accept();  // Simulate clicking "OK" (confirm the action)
          }
        });
        await page.getByRole('button', { name: 'remove' }).click()
        await page.goto('http://localhost:5173');                
        await expect(page.getByText('E2EUser Blog Title (Author: Blog Author')).not.toBeVisible()     
      })

      test('blogs are sorted by likes', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('write title here').fill('Blog with 0 like')
        await page.getByPlaceholder('write author here').fill('Author 0')
        await page.getByPlaceholder('write url here').fill('http://likes0')
        await page.getByRole('button', { name: 'create'}).click();  
        await expect(page.getByText('Blog with 0 like (Author: Author 0')).toBeVisible()

        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('write title here').fill('Blog with 1 like')
        await page.getByPlaceholder('write author here').fill('Author 1')
        await page.getByPlaceholder('write url here').fill('http://likes1')
        await page.getByRole('button', { name: 'create'}).click();
        await expect(page.getByText('Blog with 1 like (Author: Author 1')).toBeVisible()

        const items = await page.locator('//div[@class="blog"]').allTextContents()

        // Define the expected sequence of item texts
        const expectedSequence = ['Blog with 0 like (Author: Author 0)view',
                                  'Blog with 1 like (Author: Author 1)view']

        // Verify the sequence of items
        expect(items).toEqual(expectedSequence);

        const buttons = await page.locator('//button[@class="viewDetails"]')
        const secondButton = buttons.nth(1)
        await secondButton.click()
        await expect(page.getByText('http://likes1')).toBeVisible()
        await expect(page.getByText('likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()  
        
        //wait due to re-render
        await page.waitForSelector('//div[@class="blog"]') 
        await buttons.nth(0).click()
        const items2 = await page.locator('//div[@class="blog"]').allTextContents()
         
        const expectedSequence2 = ['Blog with 1 like (Author: Author 1)view',
                                   'Blog with 0 like (Author: Author 0)view']
         expect(items2).toEqual(expectedSequence2);
      })
    })
  })

})