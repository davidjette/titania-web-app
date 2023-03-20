// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Select the button and paragraph elements by their IDs
    const exampleButton = document.getElementById("example-button");
    const exampleParagraph = document.getElementById("example-paragraph");

    // Add a click event listener to the button
    exampleButton.addEventListener("click", function () {
        // Update the content of the paragraph when the button is clicked
        exampleParagraph.textContent = "You've clicked the button!";
    });
});
