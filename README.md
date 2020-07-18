https://datatable-bitselector.herokuapp.com/


# data-table-selector
A small and pratical program, created to simplify the work in a reverse engeenering project.
We needed to analyze the signal of the Lin protocol, used inside a camper. The goal was understanding the signals given by the buttons, so as to create a tablet where the user could better
configure his camper(like the heat, the water temperature and so on). 
To do this we had to analyze and decode the signals sent over the lin protocol. Hence, we connected our oscilloscope to the bus and recorded chunks of data. 
Decoding the signals was harder than expected (because we need to compare endless sequences of bits, taking notes of their differences over time when different events occurred).
So I coded in a couple of days this app that helped us a lot to immediately figure out what are the bits that change.
It takes in input two file (use T0006LIN and T0007LIN as sample data) and simply compares all the bits present in this two files, row by row.


