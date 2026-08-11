package com.comforttravels.mapper;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.entity.TravelPackage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = DestinationMapper.class)
public interface PackageMapper {
    PackageMapper INSTANCE = Mappers.getMapper(PackageMapper.class);
    PackageDto toDto(TravelPackage e);
    java.util.List<PackageDto> toDto(java.util.List<TravelPackage> list);
}