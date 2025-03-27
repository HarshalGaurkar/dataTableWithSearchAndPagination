import { LightningElement, track, wire } from 'lwc';
import getTableData from '@salesforce/apex/TableController.getTableData';

export default class DataTableWithSearchAndPagination extends LightningElement {
    @track data = [];
    @track filteredData = [];
    @track columns = [
        { label: 'Name', fieldName: 'Name', sortDirection: 'asc', sortIcon: 'utility:arrowup' },
        { label: 'Email', fieldName: 'Email', sortDirection: 'asc', sortIcon: 'utility:arrowup' },
        { label: 'Phone', fieldName: 'Phone', sortDirection: 'asc', sortIcon: 'utility:arrowup' }
    ];
    
    pageSize = 5;
    currentPage = 1;

    @wire(getTableData)
    wiredData({ error, data }) {
        if (data) {
            this.data = data;
            this.filteredData = [...this.data];
            this.currentPage = 1;
        }
    }

    handleSort(event) {
        const field = event.currentTarget.dataset.field;
        
        if (!field) {
            console.error('Sorting field is missing!');
            return;
        }
    
        let column = this.columns.find(col => col.fieldName === field);
        if (!column) {
            console.error(`Column not found for field: ${field}`);
            return;
        }
    
        // Toggle sort direction
        column.sortDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
        column.sortIcon = column.sortDirection === 'asc' ? 'utility:arrowup' : 'utility:arrowdown';
    
        // Perform sorting
        this.filteredData = [...this.filteredData].sort((a, b) => {
            let aValue = a[field] ? a[field].toLowerCase() : '';
            let bValue = b[field] ? b[field].toLowerCase() : '';
            return column.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    
        // Update pagination after sorting
        this.updatePagination();
    }
    

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.filteredData = this.data.filter(row => 
            Object.values(row).some(value => value && value.toString().toLowerCase().includes(searchTerm))
        );
        this.currentPage = 1;
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    get totalPages() {
        return Math.ceil(this.filteredData.length / this.pageSize);
    }

    get disablePrev() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage >= this.totalPages;
    }

    get pagedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        
        return this.filteredData.slice(start, end).map(row => {
            return {
                Id: row.Id,
                Name: row.Name || '',
                Email: row.Email || '',
                Phone: row.Phone || ''
            };
        });
    }
}
