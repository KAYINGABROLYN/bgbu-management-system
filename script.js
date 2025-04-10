
// Main JavaScript for BGBU Management System

document.addEventListener('DOMContentLoaded', function() {
    // Common functionality across all pages
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            if (this.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Activate current tab
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Region/Organization tab functionality
    const regionTabs = document.querySelectorAll('.region-tab, .org-tab');
    regionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            const containerClass = this.classList.contains('region-tab') ? 'region-conference' : 'organization-container';
            
            // Deactivate all tabs
            document.querySelectorAll('.region-tab, .org-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Hide all contents
            document.querySelectorAll(`.${containerClass}`).forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate current tab and content
            this.classList.add('active');
            document.getElementById(`${region}-${containerClass.split('-')[0]}`).classList.add('active');
        });
    });
    
    // Form tab functionality
    const formTabs = document.querySelectorAll('.form-tab');
    if (formTabs.length > 0) {
        formTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Hide all tab contents
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Deactivate all tab buttons
                document.querySelectorAll('.form-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Activate current tab
                document.getElementById(tabId).classList.add('active');
                this.classList.add('active');
            });
        });
        
        // Form navigation
        const nextButtons = document.querySelectorAll('.next-btn');
        const prevButtons = document.querySelectorAll('.prev-btn');
        
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentTab = this.closest('.tab-content');
                const nextTab = currentTab.nextElementSibling;
                
                // Validate current tab before proceeding
                if (validateFormTab(currentTab.id)) {
                    currentTab.classList.remove('active');
                    nextTab.classList.add('active');
                    
                    // Update form tab button
                    const currentTabButton = document.querySelector(`.form-tab[data-tab="${currentTab.id}"]`);
                    const nextTabButton = document.querySelector(`.form-tab[data-tab="${nextTab.id}"]`);
                    
                    currentTabButton.classList.remove('active');
                    nextTabButton.classList.add('active');
                    
                    // Update review section if on review tab
                    if (nextTab.id === 'review-tab') {
                        updateReviewSection();
                    }
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentTab = this.closest('.tab-content');
                const prevTab = currentTab.previousElementSibling;
                
                currentTab.classList.remove('active');
                prevTab.classList.add('active');
                
                // Update form tab button
                const currentTabButton = document.querySelector(`.form-tab[data-tab="${currentTab.id}"]`);
                const prevTabButton = document.querySelector(`.form-tab[data-tab="${prevTab.id}"]`);
                
                currentTabButton.classList.remove('active');
                prevTabButton.classList.add('active');
            });
        });
    }
    
    // Payment method toggle
    const paymentMethod = document.getElementById('reg-payment-method');
    if (paymentMethod) {
        paymentMethod.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            
            const selectedMethod = this.value;
            if (selectedMethod) {
                document.getElementById(`${selectedMethod}-details`).style.display = 'block';
            }
        });
    }
    
    const existingPaymentMethod = document.getElementById('existing-method');
    if (existingPaymentMethod) {
        existingPaymentMethod.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            
            const selectedMethod = this.value;
            if (selectedMethod) {
                document.getElementById(`existing-${selectedMethod}-details`).style.display = 'block';
            }
        });
    }
    
    // Member category fee calculation
    const memberCategory = document.getElementById('reg-category');
    if (memberCategory) {
        memberCategory.addEventListener('change', function() {
            const category = this.value;
            let fee = 0;
            let categoryName = '';
            
            switch(category) {
                case 'junior':
                    fee = 10000;
                    categoryName = 'Junior Member';
                    break;
                case 'senior':
                    fee = 15000;
                    categoryName = 'Senior Member';
                    break;
                case 'officer':
                    fee = 20000;
                    categoryName = 'Officer';
                    break;
                case 'volunteer':
                    fee = 10000;
                    categoryName = 'Volunteer';
                    break;
                default:
                    fee = 0;
                    categoryName = '';
            }
            
            document.getElementById('fee-category').textContent = categoryName;
            document.getElementById('fee-amount').textContent = `UGX ${fee.toLocaleString()}`;
        });
    }
    
    // Existing member category fee calculation
    const existingCategory = document.getElementById('existing-category');
    if (existingCategory) {
        existingCategory.addEventListener('change', function() {
            const category = this.value;
            let fee = 0;
            
            switch(category) {
                case 'junior':
                    fee = 10000;
                    break;
                case 'senior':
                    fee = 15000;
                    break;
                case 'officer':
                    fee = 20000;
                    break;
                case 'volunteer':
                    fee = 10000;
                    break;
                default:
                    fee = 0;
            }
            
            document.getElementById('existing-fee-amount').textContent = `UGX ${fee.toLocaleString()}`;
        });
    }
    
    // Calendar functionality
    if (document.getElementById('calendar')) {
        generateCalendar();
        
        document.getElementById('prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar();
        });
        
        document.getElementById('next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar();
        });
    }
    
    // Load events for various pages
    if (document.getElementById('events-container')) {
        loadEvents('events-container', [
            {
                title: 'National Leadership Training',
                date: '2023-11-15',
                location: 'Kampala',
                description: 'Annual training for all battalion and company officers'
            },
            {
                title: 'Regional Camp',
                date: '2023-12-10',
                location: 'Jinja',
                description: 'Three-day camping event for senior members'
            },
            {
                title: 'Community Service Day',
                date: '2024-01-20',
                location: 'Nationwide',
                description: 'National day of community service projects'
            }
        ]);
    }
    
    if (document.getElementById('regional-events')) {
        loadEvents('regional-events', [
            {
                title: 'East African Brigade Games',
                date: '2024-02-15',
                location: 'Nairobi, Kenya',
                description: 'Regional sports competition'
            },
            {
                title: 'Leadership Exchange Program',
                date: '2024-04-01',
                location: 'Multiple Countries',
                description: 'Officer exchange between member countries'
            }
        ]);
    }
    
    if (document.getElementById('global-events')) {
        loadEvents('global-events', [
            {
                title: 'Global Brigade Camp',
                date: '2024-07-20',
                location: 'South Africa',
                description: 'International camping event'
            },
            {
                title: 'World Assembly',
                date: '2024-09-05',
                location: 'London, UK',
                description: 'Global leadership conference'
            }
        ]);
    }
    
    // Load regions for field offices page
    if (document.getElementById('region-container')) {
        loadRegions();
    }
    
    // Load member directory
    if (document.getElementById('member-directory')) {
        loadMembers();
    }
    
    // Modal functionality for member profiles
    const viewProfileButtons = document.querySelectorAll('.view-profile');
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            openMemberProfile(memberId);
        });
    });
    
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('profile-modal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('profile-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission handlers
    const memberRegistrationForm = document.getElementById('member-registration');
    if (memberRegistrationForm) {
        memberRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration submitted successfully! You will receive a confirmation message shortly.');
            // In a real application, you would send the form data to a server here
        });
    }
    
    const existingMemberForm = document.getElementById('existing-member-payment');
    if (existingMemberForm) {
        existingMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment submitted successfully! Your subscription will be updated shortly.');
            // In a real application, you would send the form data to a server here
        });
    }
    
    const trainingRegistrationForm = document.getElementById('training-registration');
    if (trainingRegistrationForm) {
        trainingRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Training registration submitted successfully!');
            // In a real application, you would send the form data to a server here
        });
    }
    
    const conferenceRegistrationForm = document.getElementById('conference-registration');
    if (conferenceRegistrationForm) {
        conferenceRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Conference registration submitted successfully!');
            // In a real application, you would send the form data to a server here
        });
    }
    
    // Load battalions for registration form
    if (document.getElementById('reg-battalion')) {
        loadBattalions('reg-battalion');
    }
    
    // Load courses for training registration
    if (document.getElementById('reg-course')) {
        loadCourses();
    }
    
    // Field office search functionality
    const battalionSearch = document.getElementById('battalion-search');
    if (battalionSearch) {
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('battalion-results');
        
        searchBtn.addEventListener('click', function() {
            const searchTerm = battalionSearch.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Simulate search results
                const results = [
                    { name: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Battalion`, contact: 'Officer John Doe', phone: '+256 789 123 456', email: `${searchTerm.toLowerCase()}@bgbu.org` }
                ];
                
                displaySearchResults(results);
            }
        });
        
        function displaySearchResults(results) {
            searchResults.innerHTML = '';
            
            if (results.length === 0) {
                searchResults.innerHTML = '<p>No battalions found matching your search.</p>';
                return;
            }
            
            results.forEach(result => {
                const resultCard = document.createElement('div');
                resultCard.className = 'battalion-card';
                resultCard.innerHTML = `
                    <h3>${result.name}</h3>
                    <p><strong>Contact:</strong> ${result.contact}</p>
                    <p><strong>Phone:</strong> ${result.phone}</p>
                    <p><strong>Email:</strong> ${result.email}</p>
                `;
                searchResults.appendChild(resultCard);
            });
        }
    }
    
    // Member directory search
    const memberSearch = document.getElementById('member-search');
    if (memberSearch) {
        const searchMemberBtn = document.getElementById('search-member-btn');
        
        searchMemberBtn.addEventListener('click', function() {
            const searchTerm = memberSearch.value.trim().toLowerCase();
            const categoryFilter = document.getElementById('filter-category').value;
            const regionFilter = document.getElementById('filter-region').value;
            const battalionFilter = document.getElementById('filter-battalion').value.trim().toLowerCase();
            
            filterMembers(searchTerm, categoryFilter, regionFilter, battalionFilter);
        });
        
        // Add event listeners to filter dropdowns
        document.getElementById('filter-category').addEventListener('change', function() {
            const searchTerm = memberSearch.value.trim().toLowerCase();
            const categoryFilter = this.value;
            const regionFilter = document.getElementById('filter-region').value;
            const battalionFilter = document.getElementById('filter-battalion').value.trim().toLowerCase();
            
            filterMembers(searchTerm, categoryFilter, regionFilter, battalionFilter);
        });
        
        document.getElementById('filter-region').addEventListener('change', function() {
            const searchTerm = memberSearch.value.trim().toLowerCase();
            const categoryFilter = document.getElementById('filter-category').value;
            const regionFilter = this.value;
            const battalionFilter = document.getElementById('filter-battalion').value.trim().toLowerCase();
            
            filterMembers(searchTerm, categoryFilter, regionFilter, battalionFilter);
        });
        
        document.getElementById('filter-battalion').addEventListener('input', function() {
            const searchTerm = memberSearch.value.trim().toLowerCase();
            const categoryFilter = document.getElementById('filter-category').value;
            const regionFilter = document.getElementById('filter-region').value;
            const battalionFilter = this.value.trim().toLowerCase();
            
            filterMembers(searchTerm, categoryFilter, regionFilter, battalionFilter);
        });
    }
});

// Calendar variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Generate calendar
function generateCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let calendarHTML = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const hasEvent = checkIfDateHasEvent(dateStr);
        const isToday = currentYear === currentDate.getFullYear() && 
                        currentMonth === currentDate.getMonth() && 
                        day === currentDate.getDate();
        
        let dayClass = 'calendar-day';
        if (hasEvent) dayClass += ' has-event';
        if (isToday) dayClass += ' today';
        
        calendarHTML += `<div class="${dayClass}" data-date="${dateStr}">${day}</div>`;
    }
    
    document.getElementById('calendar').innerHTML = calendarHTML;
    
    // Add click event to calendar days
    document.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
        day.addEventListener('click', function() {
            const dateStr = this.getAttribute('data-date');
            displayEventsForDate(dateStr);
        });
    });
    
    // Display today's events by default
    const todayStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    displayEventsForDate(todayStr);
}

// Check if a date has events (simplified for demo)
function checkIfDateHasEvent(dateStr) {
    const eventDates = [
        '2023-11-15',
        '2023-12-10',
        '2024-01-20',
        '2024-02-15',
        '2024-04-01',
        '2024-07-20',
        '2024-09-05'
    ];
    
    return eventDates.includes(dateStr);
}

// Display events for a specific date
function displayEventsForDate(dateStr) {
    const eventsContainer = document.getElementById('calendar-events');
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Simulated events data
    const events = {
        '2023-11-15': [
            { title: 'National Leadership Training', time: '9:00 AM - 4:00 PM', location: 'BGBU National Office, Kampala' }
        ],
        '2023-12-10': [
            { title: 'Regional Camp', time: 'All Day', location: 'Jinja Campsite' }
        ],
        '2024-01-20': [
            { title: 'Community Service Day', time: '8:00 AM - 1:00 PM', location: 'Nationwide' }
        ],
        '2024-02-15': [
            { title: 'East African Brigade Games', time: 'All Day', location: 'Nairobi, Kenya' }
        ],
        '2024-04-01': [
            { title: 'Leadership Exchange Program', time: 'All Month', location: 'Multiple Countries' }
        ],
        '2024-07-20': [
            { title: 'Global Brigade Camp', time: 'All Day', location: 'South Africa' }
        ],
        '2024-09-05': [
            { title: 'World Assembly', time: '9:00 AM - 5:00 PM', location: 'London, UK' }
        ]
    };
    
    let eventsHTML = `<h3>Events on ${formattedDate}</h3>`;
    
    if (events[dateStr]) {
        events[dateStr].forEach(event => {
            eventsHTML += `
                <div class="event-card">
                    <h4>${event.title}</h4>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
            `;
        });
    } else {
        eventsHTML += '<p>No events scheduled for this date.</p>';
    }
    
    eventsContainer.innerHTML = eventsHTML;
}

// Load events into a container
function loadEvents(containerId, events) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    let eventsHTML = '';
    
    events.forEach(event => {
        const date = new Date(event.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        eventsHTML += `
            <div class="event-card">
                <div class="event-image">
                    <img src="images/event-placeholder.jpg" alt="${event.title}">
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <div class="event-date">
                        <i class="far fa-calendar-alt"></i> ${formattedDate}
                    </div>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                    <p>${event.description}</p>
                    <a href="#" class="register-btn">Register</a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = eventsHTML;
}

// Load regions for field offices page
function loadRegions() {
    const regions = [
        {
            name: 'Central Region',
            districts: ['Kampala', 'Wakiso', 'Mukono', 'Luweero', 'Mpigi', 'Nakasongola', 'Kayunga', 'Mityana'],
            coordinator: 'Rev. James Kato',
            contact: '+256 789 123 456'
        },
        {
            name: 'Eastern Region',
            districts: ['Jinja', 'Iganga', 'Kamuli', 'Bugiri', 'Busia', 'Mbale', 'Soroti', 'Kumi'],
            coordinator: 'Ms. Sarah Nalwoga',
            contact: '+256 789 654 321'
        },
        {
            name: 'Northern Region',
            districts: ['Gulu', 'Lira', 'Kitgum', 'Pader', 'Arua', 'Nebbi', 'Adjumani', 'Moyo'],
            coordinator: 'Mr. David Okello',
            contact: '+256 789 111 222'
        },
        {
            name: 'Western Region',
            districts: ['Mbarara', 'Kabale', 'Kasese', 'Hoima', 'Masaka', 'Fort Portal', 'Bushenyi', 'Rukungiri'],
            coordinator: 'Mrs. Grace Tumusiime',
            contact: '+256 789 333 444'
        }
    ];
    
    const regionContainer = document.getElementById('region-container');
    let regionHTML = '';
    
    regions.forEach(region => {
        let districtsHTML = '';
        region.districts.forEach(district => {
            districtsHTML += `<li>${district}</li>`;
        });
        
        regionHTML += `
            <div class="region-card" data-region="${region.name.toLowerCase().replace(' ', '-')}">
                <h3>${region.name}</h3>
                <p><strong>Coordinator:</strong> ${region.coordinator}</p>
                <p><strong>Contact:</strong> ${region.contact}</p>
                <h4>Districts:</h4>
                <ul>${districtsHTML}</ul>
            </div>
        `;
    });
    
    regionContainer.innerHTML = regionHTML;
}

// Load members for directory
function loadMembers() {
    const members = [
        {
            id: 'BGBU-2020-04521',
            name: 'Sarah Kintu',
            age: 17,
            gender: 'Female',
            category: 'senior',
            role: 'Company Sergeant',
            battalion: 'Kampala',
            region: 'central',
            company: 'St. Luke\'s BGBU',
            photo: 'member1.jpg',
            badges: ['leadership', 'firstaid', 'community'],
            interests: ['music', 'sports', 'teaching']
        },
        {
            id: 'BGBU-2018-03215',
            name: 'David Mwesigwa',
            age: 25,
            gender: 'Male',
            category: 'officer',
            role: 'Battalion Commander',
            battalion: 'Mbarara',
            region: 'western',
            company: 'St. Paul\'s BGBU',
            photo: 'member2.jpg',
            badges: ['leadership', 'training', 'organization'],
            interests: ['outdoors', 'technology', 'mentoring']
        },
        {
            id: 'BGBU-2022-07891',
            name: 'Grace Nakato',
            age: 11,
            gender: 'Female',
            category: 'junior',
            role: 'Squad Leader',
            battalion: 'Gulu',
            region: 'northern',
            company: 'Christ the King BGBU',
            photo: 'member3.jpg',
            badges: ['bible', 'crafts', 'fitness'],
            interests: ['art', 'singing', 'reading']
        },
        {
            id: 'BGBU-2019-05642',
            name: 'Robert Ssentamu',
            age: 22,
            gender: 'Male',
            category: 'officer',
            role: 'Training Officer',
            battalion: 'Jinja',
            region: 'eastern',
            company: 'St. Peter\'s BGBU',
            photo: 'member4.jpg',
            badges: ['teaching', 'discipleship', 'planning'],
            interests: ['education', 'writing', 'public speaking']
        },
        {
            id: 'BGBU-2021-06783',
            name: 'Esther Namugga',
            age: 15,
            gender: 'Female',
            category: 'senior',
            role: 'Assistant Sergeant',
            battalion: 'Wakiso',
            region: 'central',
            company: 'St. Mark\'s BGBU',
            photo: 'member5.jpg',
            badges: ['music', 'evangelism', 'service'],
            interests: ['drama', 'dance', 'community']
        },
        {
            id: 'BGBU-2017-02145',
            name: 'John Mugisha',
            age: 28,
            gender: 'Male',
            category: 'officer',
            role: 'Regional Coordinator',
            battalion: 'Mbale',
            region: 'eastern',
            company: 'St. Andrew\'s BGBU',
            photo: 'member6.jpg',
            badges: ['administration', 'finance', 'strategy'],
            interests: ['management', 'networking', 'development']
        }
    ];
    
    displayMembers(members);
    
    // Set up pagination
    setupPagination(members.length, 6);
}

// Display members in directory
function displayMembers(members) {
    const memberGrid = document.getElementById('member-directory');
    let memberHTML = '';
    
    members.forEach(member => {
        memberHTML += `
            <div class="member-card" data-id="${member.id}" data-category="${member.category}" data-region="${member.region}" data-battalion="${member.battalion.toLowerCase()}">
                <div class="member-photo">
                    <img src="images/${member.photo}" alt="${member.name}">
                </div>
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p>${member.battalion} Battalion</p>
                <button class="view-profile" data-member="${member.id.replace('BGBU-', '').toLowerCase()}">View Profile</button>
            </div>
        `;
    });
    
    memberGrid.innerHTML = memberHTML;
    
    // Add event listeners to view profile buttons
    document.querySelectorAll('.member-card .view-profile').forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const member = members.find(m => m.id.replace('BGBU-', '').toLowerCase() === memberId);
            if (member) {
                openMemberProfile(member);
            }
        });
    });
}

// Filter members based on search and filters
function filterMembers(searchTerm, categoryFilter, regionFilter, battalionFilter) {
    const memberCards = document.querySelectorAll('.member-card');
    let visibleCount = 0;
    
    memberCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('.member-role').textContent.toLowerCase();
        const battalion = card.querySelector('p:not(.member-role)').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || 
                             name.includes(searchTerm) || 
                             role.includes(searchTerm) || 
                             battalion.includes(searchTerm);
        
        const matchesCategory = categoryFilter === 'all' || 
                               card.getAttribute('data-category') === categoryFilter;
        
        const matchesRegion = regionFilter === 'all' || 
                             card.getAttribute('data-region') === regionFilter;
        
        const matchesBattalion = !battalionFilter || 
                                card.getAttribute('data-battalion').includes(battalionFilter);
        
        if (matchesSearch && matchesCategory && matchesRegion && matchesBattalion) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update pagination based on visible members
    setupPagination(visibleCount, 6);
}

// Set up pagination
function setupPagination(totalItems, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button ${i === 1 ? 'class="active"' : ''}>${i}</button>`;
    }
    
    pagination.innerHTML = paginationHTML;
    
    // Add click event to pagination buttons
    pagination.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            pagination.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            // In a real application, you would load the appropriate page of results here
        });
    });
}

// Open member profile modal
function openMemberProfile(member) {
    const modal = document.getElementById('profile-modal');
    
    // Populate modal with member data
    document.getElementById('modal-name').textContent = member.name;
    document.getElementById('modal-id').textContent = `ID: ${member.id}`;
    document.getElementById('modal-age').textContent = member.age;
    document.getElementById('modal-gender').textContent = member.gender;
    document.getElementById('modal-joined').textContent = member.id.split('-')[1]; // Extract year from ID
    document.getElementById('modal-company').textContent = member.company;
    document.getElementById('modal-role').textContent = member.role;
    document.getElementById('modal-previous').textContent = 'Squad Leader (2021-2022)'; // Example data
    document.getElementById('modal-assignments').textContent = 'Regional Youth Council Representative'; // Example data
    document.getElementById('modal-location').textContent = `${member.battalion} Battalion, ${getRegionName(member.region)} Region`;
    
    // Set category label
    let categoryLabel = '';
    switch(member.category) {
        case 'junior':
            categoryLabel = 'Junior Member';
            break;
        case 'senior':
            categoryLabel = 'Senior Member';
            break;
        case 'officer':
            categoryLabel = 'Officer';
            break;
        case 'volunteer':
            categoryLabel = 'Volunteer';
            break;
    }
    document.getElementById('modal-category').textContent = categoryLabel;
    
    // Set photo
    document.getElementById('modal-photo').src = `images/${member.photo}`;
    document.getElementById('modal-photo').alt = member.name;
    
    // Display badges
    const badgesContainer = document.getElementById('modal-badges');
    badgesContainer.innerHTML = '';
    
    member.badges.forEach(badge => {
        badgesContainer.innerHTML += `
            <div class="badge-small">
                <img src="images/${badge}-badge.png" alt="${badge}">
            </div>
        `;
    });
    
    // Display interests
    const interestsContainer = document.getElementById('modal-interests');
    interestsContainer.innerHTML = '';
    
    member.interests.forEach(interest => {
        interestsContainer.innerHTML += `
            <span class="interest-tag">${interest}</span>
        `;
    });
    
    // Show modal
    modal.style.display = 'block';
}

// Get region name from region code
function getRegionName(regionCode) {
    switch(regionCode) {
        case 'central':
            return 'Central';
        case 'eastern':
            return 'Eastern';
        case 'northern':
            return 'Northern';
        case 'western':
            return 'Western';
        default:
            return '';
    }
}

// Load battalions for dropdown
function loadBattalions(selectId) {
    const battalions = [
        'Kampala', 'Wakiso', 'Mukono', 'Jinja', 'Iganga', 'Mbale', 'Soroti', 
        'Gulu', 'Lira', 'Mbarara', 'Kabale', 'Kasese', 'Masaka', 'Fort Portal'
    ];
    
    const select = document.getElementById(selectId);
    battalions.forEach(battalion => {
        const option = document.createElement('option');
        option.value = battalion.toLowerCase();
        option.textContent = battalion;
        select.appendChild(option);
    });
}

// Load courses for training registration
function loadCourses() {
    const courses = [
        { id: 'lead101', name: 'Leadership Fundamentals', category: 'leadership' },
        { id: 'fir101', name: 'First Aid Basics', category: 'technical' },
        { id: 'bib101', name: 'Bible Study Methods', category: 'spiritual' },
        { id: 'com101', name: 'Communication Skills', category: 'vocational' },
        { id: 'cam101', name: 'Camping & Outdoor Skills', category: 'technical' },
        { id: 'men101', name: 'Mentorship Training', category: 'spiritual' },
        { id: 'car101', name: 'Career Guidance', category: 'vocational' },
        { id: 'tea101', name: 'Teaching Techniques', category: 'leadership' }
    ];
    
    const select = document.getElementById('reg-course');
    
    // Clear existing options except the first one
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.name;
        select.appendChild(option);
    });
}

// Validate form tab before proceeding
function validateFormTab(tabId) {
    // In a real application, you would validate all required fields in the tab
    // For this demo, we'll just return true
    return true;
}

// Update review section with form data
function updateReviewSection() {
    const form = document.getElementById('member-registration');
    
    // Personal Information
    document.getElementById('review-name').textContent = 
        `${form.querySelector('#reg-firstname').value} ${form.querySelector('#reg-lastname').value}`;
    document.getElementById('review-dob').textContent = form.querySelector('#reg-dob').value;
    document.getElementById('review-gender').textContent = form.querySelector('#reg-gender').value;
    document.getElementById('review-phone').textContent = form.querySelector('#reg-phone').value;
    document.getElementById('review-address').textContent = form.querySelector('#reg-address').value;
    document.getElementById('review-district').textContent = form.querySelector('#reg-district').value;
    
    // Membership Information
    const category = form.querySelector('#reg-category').value;
    let categoryText = '';
    switch(category) {
        case 'junior':
            categoryText = 'Junior Member';
            break;
        case 'senior':
            categoryText = 'Senior Member';
            break;
        case 'officer':
            categoryText = 'Officer';
            break;
        case 'volunteer':
            categoryText = 'Volunteer';
            break;
    }
    document.getElementById('review-category').textContent = categoryText;
    document.getElementById('review-battalion').textContent = form.querySelector('#reg-battalion').value;
    document.getElementById('review-company').textContent = form.querySelector('#reg-company').value || 'Not specified';
    
    const previousBB = form.querySelector('input[name="previous_bb"]').checked ? 'Boys\' Brigade, ' : '';
    const previousGB = form.querySelector('input[name="previous_gb"]').checked ? 'Girls\' Brigade, ' : '';
    const previousOther = form.querySelector('input[name="previous_other"]').checked ? 'Other organization' : '';
    const previousDetails = form.querySelector('textarea[name="previous_details"]').value;
    
    let previousText = previousBB + previousGB + previousOther;
    if (previousDetails) previousText += ` (${previousDetails})`;
    document.getElementById('review-previous').textContent = previousText || 'None';
    
    // Payment Information
    const paymentMethod = form.querySelector('#reg-payment-method').value;
    let methodText = '';
    let detailsHTML = '';
    
    switch(paymentMethod) {
        case 'mobile':
            methodText = 'Mobile Money';
            detailsHTML = `
                <p><strong>Mobile Number:</strong> ${form.querySelector('#reg-mobile-number').value}</p>
                <p><strong>Transaction ID:</strong> ${form.querySelector('#reg-transaction').value}</p>
            `;
            break;
        case 'bank':
            methodText = 'Bank Transfer';
            detailsHTML = `
                <p><strong>Bank Reference:</strong> ${form.querySelector('#reg-bank-reference').value}</p>
            `;
            break;
        case 'cash':
            methodText = 'Cash Payment';
            detailsHTML = `<p>Will pay at local unit</p>`;
            break;
        case 'waiver':
            methodText = 'Fee Waiver Requested';
            detailsHTML = `
                <p><strong>Reason:</strong> ${form.querySelector('#reg-waiver-reason').value}</p>
            `;
            break;
    }
    
    document.getElementById('review-method').textContent = methodText;
    document.getElementById('review-payment-details').innerHTML = detailsHTML;
    
    // Set fee based on category
    let fee = 0;
    switch(category) {
        case 'junior':
            fee = 10000;
            break;
        case 'senior':
            fee = 15000;
            break;
        case 'officer':
            fee = 20000;
            break;
        case 'volunteer':
            fee = 10000;
            break;
    }
    
    document.getElementById('review-fee').textContent = `UGX ${fee.toLocaleString()}`;
}