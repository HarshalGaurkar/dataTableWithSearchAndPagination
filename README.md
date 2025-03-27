# Advanced LWC Table Component

## 🚀 Overview
The **Advanced LWC Table Component** is a Lightning Web Component (LWC) built for Salesforce that provides an interactive and customizable table with powerful features like sorting, searching, and pagination.

## 🎯 Features
- ✅ **Sortable Columns** - Click headers to toggle ascending/descending sorting
- 🔍 **Searchable Data** - Dynamic filtering on all table fields
- 📑 **Pagination Support** - Easy navigation for large datasets
- 🎨 **SLDS Styling** - Seamless Salesforce UI integration
- ⚡ **Apex Data Fetching** - Retrieves data dynamically from Salesforce objects

## 📂 Project Structure
```plaintext
lwc-advanced-table/
├── force-app/main/default/
│   ├── lwc/
│   │   ├── advancedTable/
│   │   │   ├── dataTableWithSearchAndPagination.html
│   │   │   ├── dataTableWithSearchAndPagination.js
│   │   │   ├── dataTableWithSearchAndPagination.js-meta.xml
│   ├── classes/
│   │   ├── TableController.cls
│   │   ├── TableController.cls-meta.xml
│   ├── README.md  (This file)
```

## 🛠️ Setup & Installation
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/lwc-advanced-table.git
   cd lwc-advanced-table
   ```
2. **Deploy to Salesforce**
   - Use **VS Code with Salesforce CLI** or deploy manually.
   - Authenticate your org:
     ```sh
     sfdx force:auth:web:login -a MyOrg
     ```
   - Deploy the component:
     ```sh
     sfdx force:source:deploy -p force-app/main/default
     ```
3. **Assign Permissions**
   - Ensure the appropriate user profiles have access to the LWC component.

## 🚀 Usage
### Add to Lightning Page
1. Navigate to **Setup > Lightning App Builder**
2. Open or create a **Lightning Record Page**
3. Drag and drop `AdvancedTable` from the **Custom Components** list
4. Save and activate the page

### Configuration
The component retrieves **Contact data** from Salesforce and displays it in a dynamic table.

## 📜 Apex Controller (`TableController.cls`)
```apex
public with sharing class TableController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getTableData() {
        List<Contact> contacts = [SELECT Id, Name, Email, Phone FROM Contact LIMIT 50];
        List<Map<String, String>> results = new List<Map<String, String>>();
        
        for (Contact c : contacts) {
            Map<String, String> row = new Map<String, String>();
            row.put('Id', c.Id);
            row.put('Name', c.Name);
            row.put('Email', c.Email);
            row.put('Phone', c.Phone);
            results.add(row);
        }
        return results;
    }
}
```

## 📢 Contributions
Feel free to fork the repository and submit a pull request if you would like to contribute or enhance the functionality.

## 📄 License
This project is licensed under the **MIT License**.

## 👨‍💻 Author
Developed by **[Harshal Gaurkar]** 🚀

---
