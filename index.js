// Packages
const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./src/generateHtmlPage');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

// Questions
class Prompt{
    constructor() {
        this.teamArray = [];
    }

    /** 
     * @returns the array of all Employee objects
     */

    getTeamArray() {
        return this.teamArray;
    }

// Questions
questions() {
    inquirer.prompt(
    {
     type: 'list',
     name: 'employeeType',
     message: "Which employee would you like to add?",
     choices: ['Manager', 'Engineer', 'Intern', 'Team information has been updated']
    })
    .then(({employeeType}) => {
        if(employeeType === 'Manager'){
        inquirer.prompt([
    {
     type: 'input',
     name: 'name',
     message: "Enter manager's name",
     validate: nameInput => {
         if (nameInput) {
             return true;
         } else {
             console.log("Enter manager's name.");
             return false;
         }
     }
    },
    {
        type: 'number',
        name: 'id',
        message: "Enter manager's employee id",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Incorrect, Employee id should be a number.");
                return false;
            }
        } 
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter manager's email",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Make sure to enter correctly.");
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'officeNumber',
        message: "Enter manager's office number",
        validate: officeNumberInput => {
            if (officeNumberInput) {
                return true;
            } else {
                console.log("Incorrect, office number should be a number.");
                return false;
            }
        }
    },
    ])

    // Pushes data into teamArray
    .then( (templateData) => {
        const newManager = new Manager(templateData.name, templateData.id, templateData.email, templateData.officeNumber)
        this.teamArray.push(newManager);
        // Sends user back to menu
        this.questions();
    });

    } else if (employeeType === 'Engineer') {
            inquirer.prompt([
                    {
                     type: 'input',
                     name: 'name',
                     message: "Enter the engineer's name",
                     validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log("Enter engineer's name.");
                            return false;
                        }
                    }
                    },
                    {
                     type: 'number',
                     name: 'id',
                     message: "Enter engineer's employee id",
                     validate: idInput => {
                        if (idInput) {
                            return true;
                        } else {
                            console.log("Incorrect, employee id should be a number.");
                            return false;
                        }
                    } 
                    },
                    {
                     type: 'input',
                     name: 'email',
                     message: "Enter engineer's email",
                     validate: emailInput => {
                        if (emailInput) {
                            return true;
                        } else {
                            console.log("Make sure to enter correctly.");
                            return false;
                        }
                    }
                    },
                    {
                     type: 'input',
                     name: 'github',
                     message: "Enter engineer's github username",
                     validate: githubInput => {
                        if (githubInput) {
                            return true;
                        } else {
                            console.log("Make sure to enter correctly.");
                            return false;
                        }
                    }  
                    }

                // Pushes data into teamArray
                ]).then( templateData => {
                    const newEngineer = new Engineer(templateData.name, templateData.id, templateData.email, templateData.github);
                    this.teamArray.push(newEngineer);
                    // Sends user back to menu
                    this.questions();
                });

        } else if (employeeType === 'Intern') {
            inquirer.prompt([
                {
                 type: 'input',
                 name: 'name',
                 message: "Enter intern's name",
                 validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Enter intern's name.");
                        return false;
                    }
                }
                },
                {
                 type: 'number',
                 name: 'id',
                 message: "Enter intern's employee id",
                 validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Incorrect, employee id should be a number.");
                        return false;
                    }
                } 
                },
                {
                 type: 'input',
                 name: 'email',
                 message: "Enter the intern's email",
                 validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log("Make sure to enter correctly.");
                        return false;
                    }
                }
                },
                {
                 type: 'input',
                 name: 'school',
                 message: "Enter intern's school name",
                 validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } else {
                        console.log("Make sure to enter correctly.");
                        return false;
                    }
                }  
                }

            // Pushes data into teamArray
            ]).then( templateData => {
                const newIntern = new Intern(templateData.name, templateData.id, templateData.email, templateData.school);
                this.teamArray.push(newIntern);
                // Sends user back to menu
                this.questions();
            });

        } else if (employeeType === 'Team information has been updated') {
            //writes the html file in the dist folder
            const pagehtml = generateHTML(this.getTeamArray());
            fs.writeFile('./dist/index.html', pagehtml, err => {
                if (err) throw new Error(err);

                console.log('Page is now created! Proceed to index.html in the dist/ folder to view it.');
            });
        }
    });

}
};

// Activates prompts in CLI
const prompt = new Prompt();
prompt.questions();

module.exports = Prompt;