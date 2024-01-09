const { updateTaskStyle } = require('./script');

document.body.innerHTML = `
  <div id="todo-list">
    <div class="todoItem">
      <div class="taskContent">
        <input type="text" value="Example Task" readonly>
      </div>
    </div>
  </div>
`;

test('updates task style correctly for completed task', () => {
    
    const taskContent = document.querySelector('.taskContent');

    let initialStyle = window.getComputedStyle(taskContent.querySelector('input[type="text"]'));
    expect(initialStyle.textDecoration).toBe('none'); // Initially, textDecoration should be 'none'

    // Call updateTaskStyle with checked status (completed task)
    updateTaskStyle(taskContent, true);

    // Check updated styles after updateTaskStyle call
    let updatedStyle = window.getComputedStyle(taskContent.querySelector('input[type="text"]'));
    expect(updatedStyle.textDecoration).toBe('line-through'); // After update, textDecoration should be 'line-through'
    expect(updatedStyle.color).toBe('gray'); // After update, color should be 'gray'
  });