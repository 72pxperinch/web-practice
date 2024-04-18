$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    
    // Function to calculate tax
    function calculateTax(age, income, extraIncome, deductions) {
        var tax = 0;
        var taxableIncome = income + extraIncome - deductions;
        if (taxableIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === '≥40 <60') {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }
        return income + extraIncome - tax; // Return overall income after tax deduction
    }

    // Submit button click event
    $('#submitBtn').click(function(){
        var age = $('#age').val();
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var deductions = parseFloat($('#deductions').val());

        // Validation
        var errors = false;
        if (isNaN(income) || income < 0) {
            $('#income').addClass('is-invalid');
            $('#incomeError').tooltip('show');
            errors = true;
        } else {
            $('#income').removeClass('is-invalid');
            $('#incomeError').tooltip('hide');
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $('#extraIncome').addClass('is-invalid');
            $('#extraIncomeError').tooltip('show');
            errors = true;
        } else {
            $('#extraIncome').removeClass('is-invalid');
            $('#extraIncomeError').tooltip('hide');
        }
        if (isNaN(deductions) || deductions < 0) {
            $('#deductions').addClass('is-invalid');
            $('#deductionsError').tooltip('show');
            errors = true;
        } else {
            $('#deductions').removeClass('is-invalid');
            $('#deductionsError').tooltip('hide');
        }
        if (age === '') {
            $('#age').addClass('is-invalid');
            $('#ageError').tooltip('show');
            errors = true;
        } else {
            $('#age').removeClass('is-invalid');
            $('#ageError').tooltip('hide');
        }

        // If no errors, calculate tax and show modal
        if (!errors) {
            var overallIncome = calculateTax(age, income, extraIncome, deductions);
            var resultMessage = "Rs: " + overallIncome.toFixed(2);
            $('#resultBody').html(resultMessage);
            $('#resultModal').modal('show');
        }
    });
});
