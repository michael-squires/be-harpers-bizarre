select('houses.*')
    .count('wizard_id AS no_of_wizards')
    .from('houses')
    .leftJoin('wizards', 'houses.house_name', '=', 'wizards.house')
    .groupBy('houses.house_name');
//.orderBy etc