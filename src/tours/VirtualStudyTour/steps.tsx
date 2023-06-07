import React from 'react';
import { GetSteps } from 'tours/Tour';

export const virtualStudyId = 'virtual-study-tour';

const getSteps: GetSteps = ({ isLoggedIn, studies, setLockTour, setGotoStep, endTour }) => [
    // Step 0: Type “glioma” in the search box
    {
        selector: '#cancer-study-search-box input',
        content: () => (
            <div className="step">
                Use the search box to find the studies of interest.
                <p>For example, type in 'glioma'.</p>
            </div>
        ),
        action: (node: Element) => {
            // auto-fill “glioma” in the search box
            node.setAttribute('value', 'glioma');
            node.dispatchEvent(new Event('input', { bubbles: true }));
        },
    },
    // Step 1: Select two studies
    {
        selector: '#cancer-study-list-container',
        content: () => (
            <div className="step">Select two studies of interest.</div>
        ),
        action: () => {
            // only when user selected more than one study, the tour will continue
            setLockTour(true);
            if (studies > 1) {
                setLockTour(false);
            }
        },
    },
    // Step 2: Click the “Explore Selected Studies” button
    {
        selector: '#explore-studies-button',
        content: () => (
            <div className="step">
                Click <strong>“Explore Selected Studies”</strong>.
            </div>
        ),
        action: () => {
            // before loading to the Study Summary page, record the current step
            localStorage.setItem(virtualStudyId, '3');
            // hide the next step button, user should click the button to continue
            setLockTour(true);
        },
    },
    // Step 3: Click the “+” icon
    {
        selector: '#show-more-description-icon',
        content: () => (
            <div className="step">
                Click on the <strong>“+”</strong> icon to see the list of
                studies.
            </div>
        ),
    },
    // Step 4: Select samples in the Mutated Genes table
    {
        selector: '#mutated-genes-table',
        content: () => (
            <div className="step">
                In the Mutated Genes table, Click the check box in the{' '}
                <strong>“#”</strong> column to select samples with one more
                mutation, and then click the <strong>“Select Samples”</strong>{' '}
                button at the bottom of the table.
            </div>
        ),
        action: () => {
            // only when user selected at least one study, the tour will continue
            setLockTour(true);
            if (studies > 0) {
                setLockTour(false);
            }
        }
    },
    // tack onto last step where we describe what they are seeing.
    {
        selector: '',
        content: () => (
            <div className="step">
                <p>
                    We are now ready to create our virtual study. Let's create a
                    virtual study and share/save it.
                </p>
                What you see will differ slightly depending on if you are logged
                in or not.
            </div>
        ),
    },
    // Step 6: Click the bookmark icon
    {
        selector: '#action-button-bookmark',
        content: () => (
            <div className="step">
                Click the <strong>bookmark</strong> icon to create and share
                your virtual study.
            </div>
        ),
        action: (node: any) => {
            // only after user clicked the bookmark icon, the tour will continue
            if (node) {
                setLockTour(true);
                const handleClick = () => {
                    setTimeout(() => {
                        setGotoStep(7);
                    }, 500);
                    node.removeEventListener('click', handleClick);
                };
                node.addEventListener('click', handleClick);
            }
        },
    },
    ...getRestSteps({ isLoggedIn, studies, setLockTour, setGotoStep, endTour }),
];

const getRestSteps: GetSteps = (props) => (
    props.isLoggedIn ? getLoggedInSteps(props) : getNotLoggedInSteps(props)
)

const getNotLoggedInSteps: GetSteps = ({ setLockTour, setGotoStep, endTour }) => [
    // Step 7: Click on the Share button
    {
        selector: '#virtual-study-summary-panel',
        content: () => (
            <div className="step">
                <p>1. Enter a name for your virtual study (optional).</p>
                2. Text box pre-filled with a description of the studies contributing samples and filters applied to the samples. You can edit this text
                <p>3. Check the list of studies contributing to samples with links to the study summary for each.</p>
                <p><strong>Click on the Share button for the next step.</strong></p>
            </div>
        ),
        action: () => {
            // only after user clicked the share button, the tour will continue
            setGotoStep(null)
            const shareButton = document.getElementById('virtual-study-summary-share-btn');
            if (shareButton) {
                const handleClick = () => {
                    setTimeout(() => {
                        setGotoStep(8);
                    }, 500);
                    shareButton.removeEventListener('click', handleClick);
                };
                shareButton.addEventListener('click', handleClick);
            }
        },
    },
    // Step 8: Show the share link
    {
        selector: '#virtual-study-summary-panel',
        content: () => (
            <div className="step">
                Click on the link to open your virtual study, or click <strong>“Copy”</strong> to copy the URL to your clipboard.
            </div>
        ),
        action: (node: any) => {
            // clear the gotoStep
            // after user clicked the panel, the tour ends
            setGotoStep(null)
            setLockTour(false);
            if (node) {
                const handleClick = () => {
                    endTour();
                    node.removeEventListener('click', handleClick);
                };
                node.addEventListener('click', handleClick);
            }
        }
    },
]

const getLoggedInSteps: GetSteps = ({ setLockTour, setGotoStep, endTour }) => [
    // Step 7: Click on the Save button
    {
        selector: '#virtual-study-summary-panel',
        content: () => (
            <div className="step">
                <p>1. Enter a name for your virtual study (optional).</p>
                2. Text box pre-filled with a description of the studies contributing samples and filters applied to the samples. You can edit this text
                <p>3. Check the list of studies contributing to samples with links to the study summary for each.</p>
                <p><strong>Click on the Save button for the next step.</strong></p>
            </div>
        ),
        action: () => {
            // only after user clicked the save button, the tour will continue
            setGotoStep(null)
            const shareButton = document.getElementById('virtual-study-summary-save-btn');
            if (shareButton) {
                const handleClick = () => {
                    setTimeout(() => {
                        setGotoStep(8);
                    }, 500);
                    shareButton.removeEventListener('click', handleClick);
                };
                shareButton.addEventListener('click', handleClick);
            }
        },
    },
    // Step 8: Show the share link
    {
        selector: '#virtual-study-summary-panel',
        content: () => (
            <div className="step">
                Click on the link to open your virtual study, or click <strong>“Copy”</strong> to copy the URL to your clipboard.
                <p>When you save a study, it is added to the homepage, at the top of the study list under “My Virtual Studies”.</p>
                <p><strong>Do you want to find it?</strong></p> 
                <button onClick={() => endTour()}>Finish guidance.</button>
                <button onClick={() => {
                    localStorage.setItem(virtualStudyId, '9');
                    // load to the homepage
                    window.location.href = '/';
                }}>Go to find it.</button>
            </div>
        ),
        action: (node: any) => {
            // hide the original next step button
            setLockTour(true);
            if (node) {
                // after user clicked the panel, clear the gotoStep, the tour ends
                const handleClick = () => {
                    setLockTour(false);
                    setGotoStep(null);
                    endTour();
                    node.removeEventListener('click', handleClick);
                };
                node.addEventListener('click', handleClick);
            }
        }
    },
    // Step 9: In homepage, Show the new virtual study pre-selected
    {
        selector: '#cancer-study-list-container',
        content: () => (
            <div className="step">
                Click <strong>“Query”</strong> brings you to the query selector with your new virtual study pre-selected.
            </div>
        ),
        action: () => {
            // end the tour if user clicked the screen
            setLockTour(false);
            setGotoStep(null);
            const handleClick = () => {
                endTour();
                document.removeEventListener('click', handleClick);
            };
            document.addEventListener('click', handleClick);
        }
    },
]

export default getSteps;
