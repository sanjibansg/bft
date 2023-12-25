function showContent(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('.content-container article');
    sections.forEach(function (section) {
        section.classList.add('hidden');
    });

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
}

function searchFunctions() {
    try {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        let searchResults = [];

        for (let i = 0; i < functionsData.length; i++) {
            const functionName = functionsData[i].name.toLowerCase();
            const functionBrief = JSON.parse('"' + functionsData[i].brief + '"').toLowerCase();

            // Check if the search term matches function name or brief
            if (functionName.includes(searchTerm) || functionBrief.includes(searchTerm)) {
                searchResults.push({
                    category: functionsData[i].category,
                    name: functionsData[i].name,
                    brief: functionsData[i].brief
                });
            }
        }

        // Display search results
        displaySearchResults(searchResults);
    } catch (error) {
        console.error("Error while searching functions:", error);
    }
}


function displaySearchResults(results) {
    try {
        let homeSection = document.getElementById("home");
        let searchResultsSection = document.getElementById("searchResultsSection");

        // Hide home section and show search results section
        homeSection.style.display = "none";
        searchResultsSection.style.display = "block";

        let categoryTitleElement = document.createElement("h2");
        categoryTitleElement.className = "category-title";
        categoryTitleElement.innerHTML = "Search results";

        searchResultsSection.innerHTML = "";
        searchResultsSection.appendChild(categoryTitleElement);

        // Display search results in the section
        for (var i = 0; i < results.length; i++) {
            var cardLink = document.createElement("a");
            cardLink.className = "card mb-3 search-result-card";
            cardLink.href = "./" + results[i].name.toLowerCase() + ".html";
            cardLink.onclick = function () {
                window.location.href = cardLink.href;
            };

            var cardBody = document.createElement("div");
            cardBody.className = "card-body";

            var cardTitle = document.createElement("h5");
            cardTitle.className = "card-title search-result-title";
            cardTitle.innerHTML = results[i].category + " Functions";

            var cardText = document.createElement("p");
            cardText.className = "card-text search-result-text";
            cardText.innerHTML = "<span style='font-weight: bold;'>" + results[i].name + "</span>: " + results[i].brief;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardLink.appendChild(cardBody);

            searchResultsSection.appendChild(cardLink);
        }
    } catch (error) {
        console.error("Error in displaying search results:", error);
    }
}
