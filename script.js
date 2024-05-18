const apiUrl = 'http://localhost:5000/api/items';

document.addEventListener('DOMContentLoaded', () => {
    fetchItems();

    document.getElementById('itemForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemId = document.getElementById('itemId').value;
        if (itemName) {
            if (itemId) {
                await updateItem(itemId, itemName);
            } else {
                await addItem(itemName);
            }
            document.getElementById('itemName').value = '';
            document.getElementById('itemId').value = '';
        }
    });
});

async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        const items = await response.json();
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(item._id));
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editItem(item));
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            itemList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function addItem(name) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        const newItem = await response.json();
        fetchItems();
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

async function updateItem(id, name) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        const updatedItem = await response.json();
        fetchItems();
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

async function deleteItem(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        fetchItems();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

function editItem(item) {
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemId').value = item._id;
}
