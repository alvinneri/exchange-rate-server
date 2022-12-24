import { Request, Response, NextFunction } from "express";
import ApiError from "../../../utils/error/ApiError";


const getRates = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const { amount} = request.body
  try {
    const result = await fetch(`https://v6.exchangerate-api.com/v6/d4a90f5a2f909a515da63faf/latest/AUD`);

    const resultJSON = await result.json();

    if(resultJSON.result === 'error'){
      return response.status(400).json({
        success: true,
        message: "Quota-Reached",
      });
    }
    const DEFAULT_RATES = ["AUD", "USD" ,"THB" ,"PHP" ,"EUR" ,"GBP", "IDRAUD"]
    
    const rates: {key: string, value: string}[]  = []

    Object.keys(resultJSON.conversion_rates).forEach(function(key, index) {
      if(DEFAULT_RATES.includes(key)) rates.push({key, value: (resultJSON.conversion_rates[key] *= amount * 1.04).toFixed(2)});
    });


    return response.status(200).json({
      success: true,
      data: rates,
      message: "Success",
    });


  } catch (error) {
    return next(new ApiError(error, 400));
  }
};

export default getRates;
