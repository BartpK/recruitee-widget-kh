const departmentsContainer = document.querySelector("#departmentscontainer");
const jobsContainer = document.querySelector("#jobscontainer");
const allDepartmentsButton = document.querySelector("#alldepartmentsbutton").addEventListener("click", () => showJobs(jobsArray))

let departments = [];
let jobsArray = [];
let selectedDepartment = "";



const getJobs = async () => {
  try {
    const res = await fetch('https://jobs.kramphub.com/api/offers', { method: "GET" });
    const jobsData = await res.json();
    jobsArray = jobsData.offers;
    createFilters();
  } catch (error) {
    console.log(error);
  }
};

const createFilters = () => {
  departments = [];

  jobsArray.forEach((job) => {
    departments.push(job.department);
  });

  departments = [...new Set(departments)]

  departments.forEach((department) => {
    const departmentButton = document.createElement("a");
    departmentButton.innerHTML = department;
    departmentButton.className = "departmentbutton"
    departmentButton.addEventListener("click", () => {
      selectedDepartment = department;
      selectJobs();
    });
    departmentsContainer.appendChild(departmentButton);
  });
  selectJobs();
};

const selectJobs = () => {
  if (selectedDepartment == "") {
    showJobs(jobsArray);
  } else {
    const jobSelection = jobsArray.filter(job => {
      return job.department === selectedDepartment
    });
    showJobs(jobSelection)
  }
}

const showJobs = (jobsToShow) => {
  jobsContainer.innerHTML = "";
  jobsToShow.forEach((job) => {
    const jobDiv = document.createElement("div");
    jobDiv.className = "jobDiv";
    jobDiv.addEventListener("click", () => {
      window.open(job.careers_url, "_black");
    });
    const jobTitle = document.createElement("h4");
    jobTitle.innerHTML = job.title;
    jobTitle.className = "jobTitle";

    const jobDepartment = document.createElement("p");
    jobDepartment.innerHTML = job.department;
    jobDepartment.className = "jobDepartments";

    const jobLocation = document.createElement("p");
    jobLocation.innerHTML = job.location;
    jobLocation.className = "jobLocation";

    jobDiv.appendChild(jobTitle);
    jobDiv.appendChild(jobDepartment);
    jobDiv.appendChild(jobLocation);
    jobsContainer.appendChild(jobDiv);
  });
};

getJobs();
