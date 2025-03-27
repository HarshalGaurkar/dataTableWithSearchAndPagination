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