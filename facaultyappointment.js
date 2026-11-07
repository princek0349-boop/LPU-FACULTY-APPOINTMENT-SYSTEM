
var facultyData = [
    {
        id: 1,
        name: "Dr. Rajesh Sharma",
        designation: "Associate Professor",
        department: "CSE",
        expertise: "CSE326 - Internet Programming Lab (HTML, CSS, JS)",
        cabin: "Block 32, Cabin 401",
        slots: [
            { time: "Mon | 02:00 PM - 02:15 PM", status: "Open" },
            { time: "Mon | 02:15 PM - 02:30 PM", status: "Booked" },
            { time: "Tue | 02:30 PM - 02:45 PM", status: "Open" },
            { time: "Wed | 03:00 PM - 03:15 PM", status: "Open" },
            { time: "Thu | 03:15 PM - 03:30 PM", status: "Booked" },
            { time: "Fri | 03:30 PM - 03:45 PM", status: "Open" }
        ]
    },
    {
        id: 2,
        name: "Prof. Manpreet Singh",
        designation: "Assistant Professor",
        department: "CSE",
        expertise: "INT108 - Python Programming & Logic Building",
        cabin: "Block 34, Cabin 205",
        slots: [
            { time: "Mon | 11:00 AM - 11:15 AM", status: "Booked" },
            { time: "Mon | 11:15 AM - 11:30 AM", status: "Open" },
            { time: "Tue | 02:00 PM - 02:15 PM", status: "Open" },
            { time: "Wed | 02:15 PM - 02:30 PM", status: "Booked" },
            { time: "Thu | 04:00 PM - 04:15 PM", status: "Open" },
            { time: "Fri | 04:15 PM - 04:30 PM", status: "Open" }
        ]
    },
    {
        id: 3,
        name: "Dr. Ananya Verma",
        designation: "Professor",
        department: "ECE",
        expertise: "ECE249 - Basic Electrical & Electronics Engg.",
        cabin: "Block 33, Cabin 108",
        slots: [
            { time: "Mon | 10:00 AM - 10:15 AM", status: "Open" },
            { time: "Tue | 10:15 AM - 10:30 AM", status: "Open" },
            { time: "Wed | 12:00 PM - 12:15 PM", status: "Booked" },
            { time: "Thu | 02:00 PM - 02:15 PM", status: "Open" },
            { time: "Thu | 02:15 PM - 02:30 PM", status: "Booked" },
            { time: "Fri | 03:00 PM - 03:15 PM", status: "Open" }
        ]
    },
    {
        id: 4,
        name: "Prof. Vikramjeet Kaur",
        designation: "Assistant Professor",
        department: "MTH",
        expertise: "MTH174 - Engineering Mathematics",
        cabin: "Block 38, Cabin 312",
        slots: [
            { time: "Mon | 01:00 PM - 01:15 PM", status: "Open" },
            { time: "Tue | 01:15 PM - 01:30 PM", status: "Booked" },
            { time: "Wed | 03:00 PM - 03:15 PM", status: "Open" },
            { time: "Wed | 03:15 PM - 03:30 PM", status: "Open" },
            { time: "Thu | 03:30 PM - 03:45 PM", status: "Booked" },
            { time: "Fri | 02:00 PM - 02:15 PM", status: "Open" }
        ]
    },
    {
        id: 5,
        name: "Dr. Harpreet Sidhu",
        designation: "Associate Professor",
        department: "CSE",
        expertise: "CSE111 - Orientation to Computing",
        cabin: "Block 32, Cabin 410",
        slots: [
            { time: "Mon | 03:00 PM - 03:15 PM", status: "Open" },
            { time: "Tue | 03:15 PM - 03:30 PM", status: "Open" },
            { time: "Wed | 03:30 PM - 03:45 PM", status: "Booked" },
            { time: "Thu | 11:00 AM - 11:15 AM", status: "Open" },
            { time: "Fri | 11:15 AM - 11:30 AM", status: "Booked" },
            { time: "Fri | 11:30 AM - 11:45 AM", status: "Open" }
        ]
    }
];


var selectedFaculty = null;       // Stores the currently clicked professor object
var selectedSlotIndex = -1;       // Stores the index of the clicked time slot
var lastBookedFaculty = null;     // Stores the professor for the active confirmation slip
var lastBookedSlotIndex = -1;     // Stores the slot index for the active confirmation slip


var facultyGrid = document.getElementById("facultyGrid");
var departmentFilter = document.getElementById("departmentFilter");
var scheduleSection = document.getElementById("scheduleSection");
var selectedProfName = document.getElementById("selectedProfName");
var selectedProfCabin = document.getElementById("selectedProfCabin");
var slotsGrid = document.getElementById("slotsGrid");
var bookingFormSection = document.getElementById("bookingFormSection");
var selectedSlotBanner = document.getElementById("selectedSlotBanner");
var appointmentForm = document.getElementById("appointmentForm");
var confirmationSection = document.getElementById("confirmationSection");
var cancelAppointmentBtn = document.getElementById("cancelAppointmentBtn");
var statusMessage = document.getElementById("statusMessage");


function renderFacultyCards(department) {
    // Clear existing cards inside the grid
    facultyGrid.innerHTML = "";

    // Loop through all professors in the facultyData array
    for (var i = 0; i < facultyData.length; i++) {
        var prof = facultyData[i];

        // Check if the professor matches the selected department filter
        if (department === "ALL" || prof.department === department) {

            // Create a new div element for the faculty card
            var card = document.createElement("div");
            card.classList.add("faculty-card");

            // Highlight the card if this professor is currently selected
            if (selectedFaculty !== null && selectedFaculty.id === prof.id) {
                card.classList.add("active-card");
            }

            // Populate the card HTML content
            card.innerHTML = 
                '<div>' +
                    '<span class="dept-badge">Dept: ' + prof.department + '</span>' +
                    '<h3>' + prof.name + '</h3>' +
                    '<p class="faculty-designation">' + prof.designation + '</p>' +
                    '<p class="faculty-info"><strong>Expertise:</strong> ' + prof.expertise + '</p>' +
                    '<p class="faculty-info"><strong>Cabin:</strong> ' + prof.cabin + '</p>' +
                '</div>' +
                '<button type="button" class="select-faculty-btn">View Office Hours</button>';

            // Attach a click event listener to select this professor
            attachFacultyClickListener(card, prof);

            // Add the card to the facultyGrid container
            facultyGrid.appendChild(card);
        }
    }
}

/* Helper function to attach click event to each faculty card */
function attachFacultyClickListener(cardElement, professorObject) {
    cardElement.addEventListener("click", function () {
        selectFacultyMember(professorObject);
    });
}

function selectFacultyMember(prof) {
    // Store the selected professor in our global variable
    selectedFaculty = prof;
    selectedSlotIndex = -1;

    // Hide any previous status message or open booking form
    statusMessage.classList.add("hidden");
    bookingFormSection.classList.add("hidden");

    // Re-render faculty cards so the active border appears on the clicked card
    renderFacultyCards(departmentFilter.value);

    // Update the banner text inside the schedule section
    selectedProfName.textContent = prof.name + " (" + prof.department + ")";
    selectedProfCabin.textContent = prof.cabin;

    // Reveal the Weekly Office Hours section
    scheduleSection.classList.remove("hidden");

    // Render the 15-minute slots for the chosen professor
    renderTimeSlots();

    // Smoothly scroll down to the office hours section
    scheduleSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}


function renderTimeSlots() {
    // Clear previous slots
    slotsGrid.innerHTML = "";

    var slotsArray = selectedFaculty.slots;

    // Loop through all 15-minute time slots of the selected professor
    for (var i = 0; i < slotsArray.length; i++) {
        var slotObj = slotsArray[i];

        // Create a button for each time slot
        var slotDiv = document.createElement("div");
        slotDiv.classList.add("slot-btn");

        // Style the slot based on whether it is "Open" or "Booked"
        if (slotObj.status === "Open") {
            slotDiv.classList.add("open-slot");

            // If this slot is currently selected for booking, add highlight class
            if (i === selectedSlotIndex) {
                slotDiv.classList.add("selected-slot");
            }

            slotDiv.innerHTML = 
                '<span>' + slotObj.time + '</span>' +
                '<span class="slot-status-text">Open - Click to Book</span>';

            // Make Open slots clickable
            attachSlotClickListener(slotDiv, i);

        } else {
            // Slot is "Booked" -> Red/Gray and unclickable
            slotDiv.classList.add("booked-slot");
            slotDiv.innerHTML = 
                '<span>' + slotObj.time + '</span>' +
                '<span class="slot-status-text">Booked</span>';
        }

        // Add the slot to the grid
        slotsGrid.appendChild(slotDiv);
    }
}

/* Helper function to attach click event to an Open slot */
function attachSlotClickListener(slotElement, index) {
    slotElement.addEventListener("click", function () {
        openBookingForm(index);
    });
}


function openBookingForm(slotIndex) {
    selectedSlotIndex = slotIndex;

    // Hide any previous confirmation slip or status banner
    confirmationSection.classList.add("hidden");
    statusMessage.classList.add("hidden");

    // Re-render slots so the clicked slot gets highlighted
    renderTimeSlots();

    // Show which professor and time slot the student is booking
    var chosenTime = selectedFaculty.slots[slotIndex].time;
    selectedSlotBanner.innerHTML = 
        "Booking Slot: <strong>" + chosenTime + "</strong> with <strong>" + selectedFaculty.name + "</strong> (" + selectedFaculty.cabin + ")";

    // Reveal the Booking Form section
    bookingFormSection.classList.remove("hidden");

    // Scroll smoothly to the form
    bookingFormSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}


appointmentForm.addEventListener("submit", function (event) {
    // Prevent the default browser page reload on form submit
    event.preventDefault();

    // Read student input values from the form fields
    var rollNumber = document.getElementById("studentRoll").value.trim();
    var subjectCode = document.getElementById("subjectCode").value.trim();
    var topic = document.getElementById("discussionTopic").value.trim();

    // Simple check to make sure a valid slot is selected
    if (selectedFaculty === null || selectedSlotIndex === -1) {
        return;
    }

    // 1. Update the slot status in our data array from "Open" to "Booked"
    selectedFaculty.slots[selectedSlotIndex].status = "Booked";

    // Save references in case the student wants to cancel this appointment
    lastBookedFaculty = selectedFaculty;
    lastBookedSlotIndex = selectedSlotIndex;

    // 2. Refresh the slots grid so the slot color changes from Open (green) to Booked (red)
    selectedSlotIndex = -1;
    renderTimeSlots();

    // 3. Populate the Confirmation Slip with booking details
    document.getElementById("slipFacultyName").textContent = lastBookedFaculty.name;
    document.getElementById("slipDepartment").textContent = lastBookedFaculty.department;
    document.getElementById("slipCabin").textContent = lastBookedFaculty.cabin;
    document.getElementById("slipTimeSlot").textContent = lastBookedFaculty.slots[lastBookedSlotIndex].time;
    document.getElementById("slipStudentRoll").textContent = rollNumber.toUpperCase();
    document.getElementById("slipSubjectCode").textContent = subjectCode.toUpperCase();
    document.getElementById("slipTopic").textContent = topic;

    // 4. Hide the booking form and show the Confirmation Slip
    bookingFormSection.classList.add("hidden");
    confirmationSection.classList.remove("hidden");

    // Reset the form inputs for future bookings
    appointmentForm.reset();

    // Scroll to the Confirmation Slip
    confirmationSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
});


cancelAppointmentBtn.addEventListener("click", function () {
    if (lastBookedFaculty !== null && lastBookedSlotIndex !== -1) {
        // Revert the slot status back to "Open"
        lastBookedFaculty.slots[lastBookedSlotIndex].status = "Open";

        // Re-render the time slots grid so the slot turns green ("Open") again
        renderTimeSlots();

        // Hide the Confirmation Slip
        confirmationSection.classList.add("hidden");

        // Show a clean status banner confirming the cancellation
        statusMessage.textContent = "Your appointment with " + lastBookedFaculty.name + " has been cancelled. The 15-minute slot is now Open again.";
        statusMessage.classList.remove("hidden");

        // Clear the stored booking reference
        lastBookedFaculty = null;
        lastBookedSlotIndex = -1;

        // Scroll back up to the schedule section
        scheduleSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});


departmentFilter.addEventListener("change", function () {
    var chosenDept = departmentFilter.value;
    renderFacultyCards(chosenDept);
});


renderFacultyCards("ALL");