describe('Основные сценарии взаимодействия с приложением', () => {
  beforeEach(() => {
    // Открываем страницу перед каждым тестом
    cy.visit('/')
  })

  it('Проверка рендеринга страницы с фоном и звездами', () => {
    // Проверяем, что фоновый градиент присутствует
    cy.get('div.bg-gradient-to-r').should('exist')

    // Проверяем, что в тёмной теме отображаются звезды
    cy.get('.stars').should('exist')

    // Проверка, что звезды сгенерированы (проверяем количество)
    cy.get('div[style*="width"]').should('have.length.greaterThan', 0)
  })

  it('Проверка переключения темы с помощью компонента ThemeToggle', () => {
    // Проверка начальной темы (предполагаем, что по умолчанию светлая тема)
    cy.get('body').should('not.have.class', 'dark')

    // Нажимаем на кнопку переключения темы
    cy.get('.ThemeToggle').click()

    // Проверяем, что тема переключена на тёмную
    cy.get('.background-window').should('have.class', 'dark:from-[#071734]')

    // Переключаем обратно на светлую тему
    cy.get('.ThemeToggle').click()

    // Проверяем, что тема снова светлая
    cy.get('body').should('not.have.class', 'dark')
  })

  it('Проверка маршрутизации через router-view', () => {
    // Проверяем, что страница по умолчанию загружается
    cy.url().should('eq', 'http://localhost:4173/')

    // Переходим по маршруту /tasks
    cy.get('a[href="/tasks"]').click()

    // Проверяем, что URL изменился
    cy.url().should('include', '/tasks')

    // Проверяем, что на странице есть определенный элемент, например, заголовок
    cy.contains('Список задач').should('be.visible')
  })
  it('Проверка работы модального окна', () => {
    // проверяем работу модального окна
    cy.url().should('eq', 'http://localhost:4173/')
    // Переходим по маршруту /tasks
    cy.get('a[href="/tasks"]').click()
    // Находим кнопку "Добавить задачу" и кликаем по ней
    cy.get('button').contains('+').click()

    // Заполняем форму
    cy.get('[data-testid="task-title"]').type('Новая задача')
    cy.get('textarea').type('Описание новой задачи')

    cy.get('form select').first().select('Средний') // Выбираем приоритет

    cy.get('form select').last().select('Завершено') // Выбираем статус

    // Нажимаем кнопку "Сохранить"
    cy.get('button').contains('Сохранить').click()

    // Проверяем, что задача появилась в списке
    cy.contains('Новая задача').should('exist')
  })

  it('Проверка работы фильтра по приоритету', () => {
    // проверяем работу модального окна
    cy.url().should('eq', 'http://localhost:4173/')
    // Переходим по маршруту /tasks
    cy.get('a[href="/tasks"]').click()
    // Выбираем фильтр по приоритету "Высокий"
    cy.get('.select-filter select').first().select('Высокий')

    // Проверяем, что отображаются только задачи с высоким приоритетом
    cy.get('.task-item')
      .first()
      .each(($el) => {
        cy.wrap($el).contains('Высокий')
      })
  })

  it('Проверка работы фильтра по названию', () => {
    // проверяем работу модального окна
    cy.url().should('eq', 'http://localhost:4173/')
    // Переходим по маршруту /tasks
    cy.get('a[href="/tasks"]').click()
    // Вводим текст в поле поиска
    cy.get('input[placeholder="Поиск по названию"]').first().type('Новая задача')

    // Проверяем, что отображаются только задачи, содержащие "Новая задача"
    cy.get('.task-item')
      .first()
      .each(($el) => {
        cy.wrap($el).contains('Задача')
      })
  })
})
