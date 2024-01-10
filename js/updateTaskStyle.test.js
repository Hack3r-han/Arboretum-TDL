const { updateTaskStyle } = require('./script');

test('updates task style correctly for completed task', () => {
    
    const taskContent = document.querySelector('.taskContent');

    let initialStyle = window.getComputedStyle(taskContent.querySelector('input[type="text"]'));
    expect(initialStyle.textDecoration).toBe('none');

    // Call updateTaskStyle with checked status (completed task)
    updateTaskStyle(taskContent, true);

    // Check updated styles after updateTaskStyle call
    let updatedStyle = window.getComputedStyle(taskContent.querySelector('input[type="text"]'));
    expect(updatedStyle.textDecoration).toBe('line-through');
    expect(updatedStyle.color).toBe('gray'); 
  });